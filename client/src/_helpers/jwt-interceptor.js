import config from "./config";

// Adds Authorization header to requests that go to Backend API
export async function jwtInterceptor(url, requestOptions) {
  const token = localStorage.getItem("currentUser");
  const isLoggedIn = token;
  const isApiUrl = url.startsWith(config.apiUrl);
  if (isLoggedIn && isApiUrl) {
    requestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, Authorization: `Bearer ${token}` },
    };
  }
  return requestOptions;
}
