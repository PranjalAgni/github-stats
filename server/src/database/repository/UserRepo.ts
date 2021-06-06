import logger from "../../utils/logger";
import User from "../models/User";

class UserRepo {
  private static instance: UserRepo;

  // Following singleton pattern
  // this will restrict to share one instance of this service across the system
  static getInstance(): UserRepo {
    if (!UserRepo.instance) {
      UserRepo.instance = new UserRepo();
    }

    return UserRepo.instance;
  }

  async getUserByUsername(username: string) {
    let user = null;
    try {
      user = await User.findOne({
        username
      });
    } catch (ex) {
      logger.error(ex);
    }
    return user;
  }

  async insertUser(username: string) {
    let userId = null;
    try {
      const user = new User({
        username
      });
      await user.save();
      userId = user._id;
    } catch (ex) {
      logger.error(ex);
    }
    return userId;
  }
}

export default UserRepo.getInstance();
