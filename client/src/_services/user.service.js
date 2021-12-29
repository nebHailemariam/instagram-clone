import config from "../_helpers/config";
import { getAsync, postAsync, putAsync } from "../_helpers/adapters";
import authStore from "../stores/auth-store";

const userService = {
  // A method for removing user details and token from local storage to logout user
  logout() {
    localStorage.removeItem("currentUser");
  },

  // A method for logging in a user
  async login(email, password) {
    try {
      let user = await postAsync(`${config.apiUrl}/users/login`, {
        email,
        password,
      });

      // Store user details and JWT token in local storage to keep a user logged in between page refreshes
      localStorage.setItem("currentUser", user);
      return user;
    } catch (err) {
      throw err;
    }
  },

  // A method for registering a user
  async register(fullName, email, password) {
    try {
      await postAsync(`${config.apiUrl}/users/signup`, {
        fullName,
        email,
        password,
      });
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
