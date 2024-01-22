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
    const { data } = await supabase
      .from("User")
      .select("*")
      .eq("email", req.user.email);
    if (data) res.status(200).json({ user: data });
    else {
      // TODO: user name is dependant on gmail
      const { data, error } = await supabase.rpc("create_return_user", {
        email: req.user.email,
        name: req.user.name,
      });
      if (error || !data)
        res.status(400).json({ error: "Can't initialize user" });
      else res.status(200).json({ message: data });
    }
  } catch (error) {
    throw error;
  }
}
export const UserController = { createText, getTexts, updateTexts, Login };
