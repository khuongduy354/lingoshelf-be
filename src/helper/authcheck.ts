import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tok = req.header("Authorization");
    if (!tok) {
      console.log("No token");
      return res.status(401).send("Access Denied");
    }

    const decoded = await getAuth().verifyIdToken(tok);
    req.user = decoded;

    next();
  } catch (err) {
    console.log("Cant auth user ", err);
    res.status(401).send("Access Denied");
  }
};
