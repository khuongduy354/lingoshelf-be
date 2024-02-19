import { Request, Response } from "express";
import { supabase } from "../helper/supabase";

export async function createText(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    // TODO: file exist bug

    const { error } = await supabase
      .from("TextFile")
      .insert({ title, content, author: req.user.id });

    if (error) res.status(400).json({ error: error.message });
    else res.status(200).json({ message: "success" });
  } catch (error) {
    throw error;
  }
}

export async function getTexts(req: Request, res: Response) {
  try {
    const { data } = await supabase
      .from("TextFile")
      .select("*")
      .eq("author", req.user.id);

    if (data) res.status(200).json({ data });
    else res.status(400).json({ error: "No data" });
  } catch (error) {
    throw error;
  }
}

export async function updateTexts(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const { error } = await supabase
      .from("TextFile")
      .update({ title, content })
      .eq("id", id);

    if (error) res.status(400).json({ error: error.message });
    else res.status(200).json({ message: "success" });
  } catch (error) {
    throw error;
  }
}

export async function Login(req: Request, res: Response) {
  try {
    // user exists
    const { data: existUser } = await supabase
      .from("User")
      .select("*")
      .eq("email", req.user.email);
    if (existUser && existUser.length > 0)
      return res.status(200).json({ user: existUser[0] });

    // user not exists
    const { data: newUser, error } = await supabase
      .from("User")
      .insert({ email: req.user.email, name: req.user.name })
      .select();
    console.log(newUser);
    console.log(error);

    if (error || newUser === null || newUser.length === 0)
      return res.status(400).json({ error: "Can't initialize user" });

    res.status(200).json({ user: newUser[0] });
  } catch (error) {
    throw error;
  }
}
export const UserController = { createText, getTexts, updateTexts, Login };
