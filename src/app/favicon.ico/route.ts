export function GET(request: Request) {
  const faviconUrl = new URL("/favicon.png", request.url);
  return Response.redirect(faviconUrl, 308);
}
