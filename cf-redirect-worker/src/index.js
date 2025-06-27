export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      const link = await env.ChaMei.get("homepage") || "https://example.com/";
      return Response.redirect(link, 302);
    }
    return new Response("404 Not Found", { status: 404 });
  }
}
