export default async function fetchCustom(
  url,
  protectedRoute = false,
  method = "get",
  body,
  contentType = "application/json",
) {
  return await fetch(url, {
    method,
    headers: {
      "Content-Type": contentType,
      authorization: protectedRoute
        ? `Bearer ${localStorage.getItem("token")}`
        : "",
    },
    body,
  });
}
