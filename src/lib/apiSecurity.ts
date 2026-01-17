type CorsOptions = {
  methods?: string[];
  allowCredentials?: boolean;
};

export const getClientIp = (request: Request): string | undefined => {
  const forwardedFor =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip");

  if (!forwardedFor) {
    return undefined;
  }

  return forwardedFor.split(",")[ 0 ]?.trim() || undefined;
};

export const getCors = (
  request: Request,
  options: CorsOptions = {},
): { headers: HeadersInit; isOriginAllowed: boolean } => {
  const origin = request.headers.get("Origin");
  const requestOrigin = new URL(request.url).origin;
  const isOriginAllowed = !origin || origin === requestOrigin;
  const methods = options.methods ?? [ "GET", "POST", "OPTIONS" ];

  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": methods.join(", "),
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (origin) {
    headers.Vary = "Origin";
    if (origin === requestOrigin) {
      headers[ "Access-Control-Allow-Origin" ] = origin;
      if (options.allowCredentials ?? true) {
        headers[ "Access-Control-Allow-Credentials" ] = "true";
      }
    }
  }

  return { headers, isOriginAllowed };
};

export const jsonResponse = (
  data: unknown,
  init: ResponseInit & { headers?: HeadersInit } = {},
): Response => {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return new Response(JSON.stringify(data), { ...init, headers });
};

export const noStoreHeaders = (): HeadersInit => ({
  "Cache-Control": "no-store",
  Pragma: "no-cache",
});
