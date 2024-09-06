//express 외장모듈을 설치해서 웹서버를 구축해보자.
//http(내장모듈)=> 경량, 기본 기능만 제공. 웹 서버의 다양한 기능을 구현시 불편함
//express(외장모둘) => 라우팅,미들웨어 에러처리 등 다양한 기능 제공
//====> 설치해야 함
// npm install express --save
// npm i express --s

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Hello Express</h1>`);
  //res. send() : 응답 본문 전송하고, 상태 코드, 컨텐타입을 자동으로 설정함
});
app.get("/killer", (req, res) => {
  res.status(405).send("forbidden 접근금지");
});

app.listen(5555, () => {
  console.log(`http://localhost:5555`);
});
