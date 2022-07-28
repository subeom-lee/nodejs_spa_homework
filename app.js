const express = require("express");
const connect = require("./schemas"); //schemas와 연결

const app = express(); //express를 사용하겠다.
const port = 3000; //3000포트로 서버를 열겠다.

connect();

const postRouter = require("./routes/post"); //routes에있는 post파일로 Route 하겠다.
const writesRouter = require("./routes/write") //routes에있는 writes파일로 Route 하겠다.
const { ConnectionStates } = require("mongoose");

const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date()); //Request 한 url과 날짜를 알려준다.
    next();
};

app.use(express.json()); //json형태의 데이터를 파싱한다.
app.use(requestMiddleware) //Middleware를 사용하겠다.

app.use("/", [postRouter, writesRouter]); //post파일, writes파일을 Router하겠다.

app.get("/", (req, res) => {
    res.send("this is home page");
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!");
});