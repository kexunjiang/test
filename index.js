const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, User } = require("./db");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/user/info", async (req, res) => {
  User.findAll({
    where: req.query
  }).then(result => {
    res.send(result)
  })
});

app.post("/user/add", async (req, res) => {
  User.create(req.body).then(result => {
    res.send(true);
  }).catch(error => {
    res.send(false)
  })
});

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
