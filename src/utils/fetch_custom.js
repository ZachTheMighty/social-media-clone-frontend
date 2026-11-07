export default async function fetchCustom(
  endpoint,
  protectedRoute = false,
  method = "get",
  body,
  contentType = "application/json",
) {
  return await fetch(`http://localhost:8080/${endpoint}`, {
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
