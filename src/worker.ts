interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = new URL(request.url).pathname;
    const acceptsHtml = request.headers.get("accept")?.includes("text/html") ?? false;
    const needsFreshDocument = acceptsHtml || pathname === "/robots.txt" || pathname === "/sitemap.xml";
    let assetRequest = request;

    if (needsFreshDocument) {
      const assetUrl = new URL(request.url);
      assetUrl.searchParams.set("__ezy_asset", Date.now().toString(36));
      assetRequest = new Request(assetUrl, request);
    }

    const response = await env.ASSETS.fetch(assetRequest);

    if (request.method !== "GET" || !needsFreshDocument) return response;

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-store");
    headers.set("CDN-Cache-Control", "no-store");
    headers.set("Cloudflare-CDN-Cache-Control", "no-store");

    // Buffer the small document responses before forwarding them. This avoids
    // passing a potentially stalled static-asset stream through the H2 edge.
    const body = await response.arrayBuffer();

    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default worker;
