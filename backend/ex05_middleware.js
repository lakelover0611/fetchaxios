//express 미들웨어 살펴보기

const express = require("express");
const app = express();
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
  console.log("Logging...", req.url);
  next();
});

app.get("/", (req, res) => {
  res.send(`<h2>Hello Word~</h2>`);
});
app.get("/bye", (req, res) => {
  res.send(`<h2>잘가세요</h2>`);
});
app.listen(5555, () => {
  console.log(`http://localhost:5555`);
});
