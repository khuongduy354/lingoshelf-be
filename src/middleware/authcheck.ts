import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { supabase } from "../helper/supabase";
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

export const authCheckPopulateUser = async (
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

    const { data: user, error } = await supabase
      .from("User")
      .select()
      .eq("email", decoded.email);

    if (error || !user || user.length === 0)
      return res.status(401).send("Account not linked properly");

    req.user = user[0];

    next();
  } catch (err) {
    console.log("Cant auth user ", err);
    res.status(401).send("Access Denied");
  }
};
