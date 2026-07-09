import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

function getR2Client(): S3Client {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const endpoint = process.env.R2_ENDPOINT;

  if (!accessKeyId || !secretAccessKey || !endpoint) {
    throw new Error(
      "Missing R2 environment variables: R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT"
    );
  }

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
}

function getBucket(): string {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) throw new Error("Missing R2_BUCKET_NAME environment variable");
  return bucket;
}

// Returns the public CDN URL for a file in the public R2 bucket.
export function getPublicUrl(key: string): string {
  const endpoint = process.env.R2_ENDPOINT_PUBLIC;
  if (!endpoint) throw new Error("Missing R2_ENDPOINT_PUBLIC environment variable");
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  return `${endpoint}/${encodedKey}`;
}

// Streams an R2 object directly to the browser — never exposes the R2 endpoint URL.
export async function streamFromR2(key: string): Promise<Response> {
  const command = new GetObjectCommand({ Bucket: getBucket(), Key: key });
  const { Body, ContentType } = await getR2Client().send(command);

  if (!Body) {
    throw new Error(`Empty body from R2 for key "${key}"`);
  }

  const rawFilename = key.split("/").pop() ?? "file.pdf";
  const filename = rawFilename.replace(/[\r\n"]/g, "");
  return new Response(Body.transformToWebStream(), {
    headers: {
      "Content-Type": ContentType ?? "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
