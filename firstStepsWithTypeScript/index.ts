import express from "express";
// const express = require("express");
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.info(`Server runnning on port ${PORT}`);
});
