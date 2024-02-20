import express from "express";
import cors from "cors";
import "dotenv/config";
import { SetupRoutes } from "./routes/index.route";
import { setupFirebase } from "./helper/firebase";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());
setupFirebase();
SetupRoutes(app);
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
