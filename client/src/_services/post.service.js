import config from "../_helpers/config";
import { getAsync } from "../_helpers/adapters";

const postService = {
  // A method for getting posts
  async getPosts() {
    try {
      return await getAsync(`${config.apiUrl}/api/Posts`);
    } catch (err) {
      throw err;
    }
  },
};

export default postService;
