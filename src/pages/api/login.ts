import type { APIRoute } from "astro";
import { getClientIp, getCors, jsonResponse, noStoreHeaders } from "@/lib/apiSecurity";
import { rateLimit } from "@/lib/rateLimit";
import { getCustomerAccessToken, getUserDetails } from "@/lib/shopify";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const OPTIONS: APIRoute = async ({ request }) => {
  const cors = getCors(request, { methods: [ "POST", "OPTIONS" ] });
  if (!cors.isOriginAllowed) {
    return new Response("Forbidden", { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      ...cors.headers,
      ...noStoreHeaders(),
    },
  });
};

// Exporting the handler function for the API route
export const POST: APIRoute = async ({ request }) => {
  const cors = getCors(request, { methods: [ "POST", "OPTIONS" ] });
  if (!cors.isOriginAllowed) {
    return jsonResponse({ errors: [ { message: "Origin not allowed." } ] }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return jsonResponse(
      { errors: [ { message: "Unsupported content type." } ] },
      {
        status: 415,
        headers: {
          ...cors.headers,
          ...noStoreHeaders(),
        },
      },
    );
  }

  const ip = getClientIp(request) || "unknown";
  const rate = rateLimit(`login:${ip}`, { limit: 10, windowMs: 60_000 });
  const rateHeaders = {
    "RateLimit-Limit": rate.limit.toString(),
    "RateLimit-Remaining": rate.remaining.toString(),
    "RateLimit-Reset": Math.ceil(rate.resetMs / 1000).toString(),
  };

  if (!rate.allowed) {
    return jsonResponse(
      { errors: [ { message: "Too many requests. Please try again later." } ] },
      {
        status: 429,
        headers: {
          ...cors.headers,
          ...rateHeaders,
          "Retry-After": rate.retryAfter.toString(),
          ...noStoreHeaders(),
        },
      },
    );
  }

  try {
    const payload = await request.json().catch(() => null);
    const email = payload?.email?.toString().trim();
    const password = payload?.password?.toString();

    if (!email || !password) {
      return jsonResponse(
        { errors: [ { message: "Email and password are required." } ] },
        {
          status: 400,
          headers: {
            ...cors.headers,
            ...rateHeaders,
            ...noStoreHeaders(),
          },
        },
      );
    }

    if (!isValidEmail(email) || password.length < 8) {
      return jsonResponse(
        { errors: [ { message: "Invalid email or password format." } ] },
        {
          status: 400,
          headers: {
            ...cors.headers,
            ...rateHeaders,
            ...noStoreHeaders(),
          },
        },
      );
    }

    // Get the customer token via Shopify API
    const { token, customerLoginErrors } = await getCustomerAccessToken({
      email,
      password,
      buyerIp: ip,
    });

    if (customerLoginErrors?.length > 0) {
      return jsonResponse(
        { errors: customerLoginErrors },
        {
          status: 400,
          headers: {
            ...cors.headers,
            ...rateHeaders,
            ...noStoreHeaders(),
          },
        },
      );
    }

    // Fetch customer details using the token
    const { customer } = await getUserDetails(token, ip);
    const isSecure = new URL(request.url).protocol === "https:";
    const cookieParts = [
      `token=${encodeURIComponent(token)}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
    ];
    if (isSecure) {
      cookieParts.push("Secure");
    }

    return jsonResponse(
      { ...customer, token },
      {
        status: 200,
        headers: {
          ...cors.headers,
          ...rateHeaders,
          ...noStoreHeaders(),
          "Set-Cookie": cookieParts.join("; "),
        },
      },
    );
  } catch (error: any) {
    console.error("Error during login:", error);

    return jsonResponse(
      {
        errors: [
          {
            code: "INTERNAL_ERROR",
            message: error.message || "An unknown error occurred",
          },
        ],
      },
      {
        status: 500,
        headers: {
          ...cors.headers,
          ...rateHeaders,
          ...noStoreHeaders(),
        },
      },
    );
  }
};
