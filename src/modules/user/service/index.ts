import { UserRepository } from "../repository";

const userRepo = new UserRepository();

export class UserService {
  getUserById = async (id: string) => {
    return userRepo.getUserById(id);
  };
}
