interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.ASSETS.fetch(request);
    const pathname = new URL(request.url).pathname;
    const acceptsHtml = request.headers.get("accept")?.includes("text/html") ?? false;
    const needsFreshDocument = acceptsHtml || pathname === "/robots.txt" || pathname === "/sitemap.xml";

    if (request.method !== "GET" || !needsFreshDocument) return response;

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-store");
    headers.set("CDN-Cache-Control", "no-store");
    headers.set("Cloudflare-CDN-Cache-Control", "no-store");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default worker;
