//express 미들웨어 살펴보기

const express = require("express");
const app = express();
const http = require("http");
/*
미들웨어: 요청과 응답 사이에 추가적인 기능을 하는 중간작업을 하고자 할때 사용
(ex.인증처리, 로깅,예외처리, 세션처리 등...)
app.use()함수를 이용
app.use(미들웨어): 모든 요청에 미들웨어 실행
app.use('/aaa', 미들웨어): '/aaa' 요청일때 미들웨어 실행
app.post('/bbb, 미들웨어): '/bbb' post 요청일때 미들웨어 실행 
--------------------
미들웨어는 여러개 사용 가능
*/
app.use((req, res, next) => {
  //미들웨어를 쓰면 작업 중간에 로깅 남기기
  console.log("1.미들웨어 요청 처리...");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); //response에서 header정보
  res.write(`<h1>Hello Express Middleware~</h1>`);
  next(); //다음 미들웨어로 가도록 호출
});
app.use((req, res, next) => {
  console.log(`2.미들웨어 요청 처리...`);
  req.user = "King"; //req.키=값
  next();
});
app.use((req, res, next) => {
  console.log(`3.미들웨어 요청 처리...(마지막 미들웨어)`);
  res.write(`<h2 style='color:red'> ${req.user}</h2>`);
  next();
});

app.get("/", (req, res) => {
  res.write(`<h1>get 방식으로 '/'로 요청들어옴</h1>`);
  res.end();
});
app.get("/bye", (req, res) => {
  res.end(`<h2>잘가세요</h2>`);
});
http.createServer(app).listen(7777, () => {
  console.log(`http://localhost:7777`);
  express;
});
