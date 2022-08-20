import { User } from "./../entities/User";
import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const createCommunity = async (req: Request, res: Response, next: any) => {
  const { name, title, description } = req.body;

  const token = req.cookies.token;
  if (!token) return next();

  const { username }: any = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOneBy({ username });
  if (!user) throw new Error("Unauthenticated");
};

const router = Router();
router.post("/", createCommunity);

export default router;
