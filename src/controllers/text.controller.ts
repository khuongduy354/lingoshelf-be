import { Request, Response } from "express";
import { supabase } from "../helper/supabase";
const getMyTexts = async (req: Request, res: Response) => {
  try {
    const { data } = await supabase
      .from("TextFile")
      .select()
      .eq("author", req.user.id);
    if (data) res.status(200).json({ textFiles: data });
  } catch (error) {
    throw error;
  }
};
const createText = async (req: Request, res: Response) => {
  try {
    let { title, content, public: textPublic } = req.body;
    textPublic = textPublic !== true ? false : true; // user not specify public === false

    const { data, error } = await supabase
      .from("TextFile")
      .insert({ title, content, author: req.user.id, public: textPublic })
      .select();
    if (error || !data || data.length === 0)
      return res.status(400).json({ message: "Cannot create text file " });
    else res.status(200).json({ message: "success", textFile: data[0] });
  } catch (error) {
    throw error;
  }
};
const updateText = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, public: textPublic } = req.body;
    let updatePayload = { title, content };
    if (textPublic !== undefined) updatePayload["public"] = textPublic;

    const { data, error } = await supabase
      .from("TextFile")
      .update(updatePayload)
      .eq("id", id)
      .eq("author", req.user.id)
      .select();
    if (error || !data || data.length === 0)
      return res.status(400).json({ message: "Cannot update text file " });
    else res.status(200).json({ message: "success", textFile: data[0] });
  } catch (error) {
    throw error;
  }
};
export const deleteText = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("TextFile")
      .delete()
      .eq("id", id)
      .eq("author", req.user.id)
      .select();
    console.log(data);
    if (error || !data || data.length === 0)
      return res.status(400).json({ message: "Cannot delete text file " });
    else res.status(200).json({ message: "success", textFile: data[0] });
  } catch (error) {
    throw error;
  }
};

export const TextController = {
  getMyTexts,
  createText,
  updateText,
  deleteText,
};
