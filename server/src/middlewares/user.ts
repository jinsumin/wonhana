import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    console.log("token", token);
    console.log(process.env.ORIGIN);
    if (!token) return next();

    const { username }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOneBy({ username });

    if (!user) throw new Error("Unauthenticated");

    // 로컬에 저장
    res.locals.user = user;
    console.log("user", user);
    return next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};
