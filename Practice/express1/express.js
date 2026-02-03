import express from "express";
import fs from "fs";
import path from "path";

const server = express();

// server.get("/", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send({
//     name: "ll",
//     age: 18,
//   });
// });

server.get("/index.html", (req, res) => {
  console.log("index.html");
  res.setHeader("Content-Type", "text/html");
  fs.readFile(path.resolve("./index.html"), (err, data) => {
    if (err) {
      res.status(500).send("server error");
    } else {
      res.send(data);
    }
  });
});

server.post("/login", (req, res) => {
  res.status(200).send("ok");
});

server.listen(8080, () => {
  console.log("listening");
});
