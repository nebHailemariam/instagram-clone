import userService from "../_services/user.service";

const HandleResponse = (response) => {
  return response.json().then((responseJson) => {
    const data = responseJson;
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        const error = "Unauthorized";
        window.location.assign("/login");
        return Promise.reject(error);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    let paginationInfo = {};

    for (let entry of response.headers) {
      if (entry[0] === "pagination") paginationInfo = JSON.parse(entry[1]);
    }

    return { data, paginationInfo };
  });
};

export default HandleResponse;
