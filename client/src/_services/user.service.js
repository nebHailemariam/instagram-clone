import config from "../_helpers/config";
import { postAsync } from "../_helpers/adapters";

const userService = {
  // A method for removing user details and token from local storage to logout user
  logout() {
    localStorage.removeItem("currentUserToken");
  },

  // A method for logging in a user
  async login(email, password) {
    try {
      let res = await postAsync(`${config.apiUrl}/api/Users/login`, {
        email,
        password,
      });

      // Store user details and JWT token in local storage to keep a user logged in between page refreshes
      localStorage.setItem("currentUserToken", JSON.stringify(res.data.token));
      return res;
    } catch (err) {
      throw err;
    }
  },

  // A method for registering a user
  async register(firstName, lastName, email, password, confirmPassword) {
    try {
      await postAsync(`${config.apiUrl}/api/Users/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
