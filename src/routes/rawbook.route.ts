import { Router } from "express";
import { RawBookController } from "../controllers/rawbook.controller";
import { authCheckPopulateUser } from "../middleware/authcheck";
import multer from "multer";

const RawBookRoute = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowExs = ["pdf", "epub", "mobi", "txt", "docx", "doc"];
    const ext = file.originalname.split(".").pop();
    if (ext === undefined) return cb(null, false);
    if (allowExs.includes(ext)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

RawBookRoute.get(
  "/me/books",
  authCheckPopulateUser,
  RawBookController.getMyBooks
);
RawBookRoute.delete(
  "/books/:id",
  authCheckPopulateUser,
  RawBookController.deleteBook
);
RawBookRoute.post(
  "/book",
  authCheckPopulateUser,
  upload.array("books", 10),
  RawBookController.uploadBook
);

export { RawBookRoute };
