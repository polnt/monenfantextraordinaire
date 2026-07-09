import crypto from "crypto";

const MOODLE_BASE_URL = process.env.NEXT_PUBLIC_MOODLE_BASE_URL;
const MOODLE_TOKEN = process.env.MOODLE_TOKEN;

const MOODLE_API_ENDPOINT = `${MOODLE_BASE_URL}/webservice/rest/server.php`;

// ─── Internal types ───────────────────────────────────────────────────────────

interface MoodleApiError {
  exception: string;
  errorcode: string;
  message: string;
}

interface MoodleUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}

interface MoodleGetUsersResponse {
  users: MoodleUser[];
  warnings: unknown[];
}

interface MoodleCreateUserResult {
  id: number;
  username: string;
}

// ─── HTTP helper ──────────────────────────────────────────────────────────────

async function callMoodleApi<T>(
  wsfunction: string,
  params: Record<string, string>
): Promise<T> {
  if (!MOODLE_BASE_URL || !MOODLE_TOKEN) {
    throw new Error(
      "Moodle is not configured: set NEXT_PUBLIC_MOODLE_BASE_URL and MOODLE_TOKEN"
    );
  }

  const body = new URLSearchParams({
    wstoken: MOODLE_TOKEN,
    wsfunction,
    moodlewsrestformat: "json",
    ...params,
  });

  const response = await fetch(MOODLE_API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Moodle API HTTP ${response.status}`);
  }

  const data = (await response.json()) as T | MoodleApiError | null;

  if (
    data !== null &&
    typeof data === "object" &&
    "exception" in data
  ) {
    const err = data as MoodleApiError;
    throw new Error(`Moodle error (${err.errorcode}): ${err.message}`);
  }

  return data as T;
}

// ─── Username generation ──────────────────────────────────────────────────────

function buildUsername(email: string): string {
  const local = (email.split("@").at(0) ?? email).toLowerCase().replace(/[^a-z0-9._-]/g, "_");
  // Add 6 random hex chars to avoid collisions between users sharing the same local part
  const suffix = crypto.randomBytes(3).toString("hex");
  return `${local}_${suffix}`.slice(0, 100);
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the Moodle user ID for the given email, creating the account if it
 * doesn't exist yet. The Moodle welcome email (if enabled on the instance) will
 * be sent to the user so they can set their password.
 */
export async function getOrCreateUser(
  email: string,
  firstname: string,
  lastname: string
): Promise<number> {
  const search = await callMoodleApi<MoodleGetUsersResponse>(
    "core_user_get_users",
    {
      "criteria[0][key]": "email",
      "criteria[0][value]": email,
    }
  );

  const existingUser = search.users.at(0);
  if (existingUser !== undefined) {
    return existingUser.id;
  }

  const created = await callMoodleApi<MoodleCreateUserResult[]>(
    "core_user_create_users",
    {
      "users[0][username]": buildUsername(email),
      "users[0][email]": email,
      "users[0][firstname]": firstname,
      "users[0][lastname]": lastname,
      // auth=manual lets Moodle send the "set your password" email via its own flow
      "users[0][auth]": "manual",
      // createpassword=1 tells Moodle to generate a password and email it to the user
      "users[0][createpassword]": "1",
    }
  );

  const newUser = created.at(0);
  if (newUser === undefined) {
    throw new Error("Moodle returned an empty response for core_user_create_users");
  }
  return newUser.id;
}

/**
 * Manually enrols a Moodle user (by ID) into a course (by numeric course ID).
 * Role 5 = student.
 */
export async function enrolUserToCourse(
  userId: number,
  courseId: number
): Promise<void> {
  await callMoodleApi<null>("enrol_manual_enrol_users", {
    "enrolments[0][roleid]": "5",
    "enrolments[0][userid]": String(userId),
    "enrolments[0][courseid]": String(courseId),
  });
}
