import { UserService } from "../service";
import { Request, Response, NextFunction } from "express";

const userService = new UserService();

export class UserController {
  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.json(user);
  };
}
