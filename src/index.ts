import express from "express";

const PORT = 8000;
const app = express();

app.get("/test", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
