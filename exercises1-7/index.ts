import express from "express";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.info(`Server running on port: ${PORT}`);
});
