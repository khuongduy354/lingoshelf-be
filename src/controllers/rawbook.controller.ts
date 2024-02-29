import { Request, Response } from "express";
import { getBucketUrl, supabase } from "../helper/supabase";
import uuid4 from "uuid4";
// Upload pdf, epub, mobi, txt

// - be: use  multer, endpoint that allows uploading atmost 10, limited formats  DONE
// -> be: upload to supabase DONE
// -> add fetch endpoint to get all urls DONE
// -> add endpoints to delete  ebooks DONE

// - fe:
// render files like text file
// uploader with filter

const getMyBooks = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("Book")
      .select()
      .eq("owner", req.user.id);
    if (error) throw error;
    res.status(200).json({ books: data });
  } catch (e) {
    throw e;
  }
};
const uploadBook = async (req: Request, res: Response) => {
  try {
    if (req.files === undefined || req.files.length === 0 || req.files === null)
      return res
        .status(400)
        .json({ message: "No files uploaded or invalid extension" });

    let filenames: string[] = [];
    await Promise.all(
      req.files?.map((file) => {
        //format filename
        let fileName: string = file.originalname;
        let filearr = fileName.split(".");
        let ext = filearr.pop();
        fileName = filearr.join("");
        fileName = fileName + "-" + uuid4().toString() + "." + ext;
        filenames.push(fileName);

        return supabase.storage
          .from("LingoShelf")
          .upload("Books/" + fileName, file.buffer)
          .then((res) => {
            const { error } = res;
            if (error) throw error;
          });
      })
    );
    filenames = filenames.map((filename) => getBucketUrl("Books/" + filename));
    await supabase.from("Book").insert(
      filenames.map((filename) => ({
        url: filename,
        owner: req.user.id,
        title: "",
      }))
    );

    res.status(201).json({ message: "Books uploaded", urls: filenames });
  } catch (e) {
    throw e;
  }
};
const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("Book")
      .delete()
      .eq("id", id)
      .eq("owner", req.user.id);
    if (error) throw error;
    res.status(200).json({ message: "Book deleted" });
  } catch (e) {
    throw e;
  }
};

const bookmark = async (req: Request, res: Response) => {
  try {
    const { bookmarks } = req.body;
    if (!Array.isArray(bookmarks))
      return res.status(400).json({ message: "Invalid bookmarks" });

    const { error } = await supabase
      .from("Book")
      .update({ bookmarks })
      .eq("owner", req.user.id);
    if (error) throw error;
    res.status(200).json({ message: "Bookmarks updated" });
  } catch (e) {
    throw e;
  }
};
const trackProgress = async (req: Request, res: Response) => {
  try {
    const { currLocation } = req.body;
    if (typeof currLocation !== "string")
      return res.status(400).json({ message: "Invalid progress" });

    const { error } = await supabase
      .from("Book")
      .update({ currLocation })
      .eq("owner", req.user.id)
      .eq("id", req.params.id);

    if (error) throw error;
    res.status(200).json({ message: "Progress updated" });
  } catch (e) {
    throw e;
  }
};
export const RawBookController = {
  getMyBooks,
  uploadBook,
  deleteBook,
  bookmark,
  trackProgress,
};
