import express from "express";
const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  console.info("someone pinged here");
  res.send("pong");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.info(`Server running on port: ${PORT}`);
});
