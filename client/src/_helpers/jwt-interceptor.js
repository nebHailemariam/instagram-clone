import config from "./config";

// Adds Authorization header to requests that go to Backend API
export async function jwtInterceptor(url, requestOptions) {
  const token = JSON.parse(localStorage.getItem("currentUserToken"));
  const isApiUrl = url.startsWith(config.apiUrl);
  if (token && isApiUrl) {
    requestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, Authorization: "Bearer " + token },
    };
  }
  return requestOptions;
}
