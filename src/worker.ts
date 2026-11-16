const PAGES_ORIGIN = "https://001ezy.github.io";
const PAGES_REPOSITORY_PATH = "/ezydev";

const worker = {
  async fetch(request: Request): Promise<Response> {
    const sourceUrl = new URL(request.url);
    let pathname = sourceUrl.pathname;

    if (pathname !== "/" && !pathname.endsWith("/") && !pathname.split("/").at(-1)?.includes(".")) {
      pathname += "/";
    }

    const destination = new URL(`${PAGES_REPOSITORY_PATH}${pathname}`, PAGES_ORIGIN);
    destination.search = sourceUrl.search;

    return Response.redirect(destination.toString(), 302);
  },
};

export default worker;
