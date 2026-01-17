import type { APIRoute } from "astro";
import { getProducts } from "@/lib/shopify";
import { getClientIp, getCors, jsonResponse, noStoreHeaders } from "@/lib/apiSecurity";

const allowedSortKeys = new Set([
  "RELEVANCE",
  "BEST_SELLING",
  "CREATED",
  "CREATED_AT",
  "PRICE",
  "TITLE",
  "ID",
]);

export const OPTIONS: APIRoute = async ({ request }) => {
  const cors = getCors(request, { methods: [ "GET", "OPTIONS" ] });
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

export const GET: APIRoute = async ({ request }) => {
  const cors = getCors(request, { methods: [ "GET", "OPTIONS" ] });
  if (!cors.isOriginAllowed) {
    return jsonResponse({ error: "Origin not allowed." }, { status: 403 });
  }

  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const rawSortKey = url.searchParams.get("sortKey")?.toUpperCase();
  const sortKey = rawSortKey && allowedSortKeys.has(rawSortKey) ? rawSortKey : undefined;
  const reverse = url.searchParams.get("reverse") === "true";
  const buyerIp = getClientIp(request);

  try {
    const { products, pageInfo } = await getProducts({
      sortKey,
      reverse,
      cursor: cursor || undefined,
      buyerIp,
    });

    return jsonResponse(
      { products, pageInfo },
      {
        status: 200,
        headers: {
          ...cors.headers,
          ...noStoreHeaders(),
        },
      },
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return jsonResponse(
      { error: "Failed to fetch products" },
      {
        status: 500,
        headers: {
          ...cors.headers,
          ...noStoreHeaders(),
        },
      },
    );
  }
};
