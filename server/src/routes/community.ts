import { User } from "./../entities/User";
import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";

const createCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, title, description } = req.body;

  const token = req.cookies.token;
  if (!token) return next();

  const { username }: any = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOneBy({ username });
  if (!user) throw new Error("Unauthenticated");
};

const router = Router();
router.post("/", userMiddleware, authMiddleware, createCommunity);

export default router;
