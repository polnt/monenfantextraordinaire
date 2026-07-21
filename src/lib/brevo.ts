const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

/**
 * Adds (or updates) a contact in the given Brevo list (see brevoLists.ts).
 * Callers should treat this as best-effort so a Brevo outage never blocks
 * the actual transactional email delivery.
 */
export async function addContactToBrevoList(email: string, listId: number): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("Missing required environment variable: BREVO_API_KEY");
  }

  const res = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo contact creation failed (${res.status}): ${body}`);
  }
}
