const express = require("express");
const app = express();

//미들웨어 설정
app.use(express.static(__dirname + "/public"));
//http://localhost:7777/main.html로 접근 가능
app.use(express.json()); //json형태의 요청 데이터를 받도록 미들웨어 설정
//application/json형태의 요청 데이터를 받도록 미들웨어 설정
app.use(express.urlencoded({ extended: false }));
//userId=a&userPw=b 식으로 데이터가 올때 요청의 본문을 파싱하도록 하는 미들웨어
//content-type이 'application/x-www-form-urlencoded'인 요청
//extended:false로 설정하면 querystring모듈을 이용해서 파싱한다.
//extended:true로 설정하면 qs모듈을 이용해 파싱한다.

app.get("/main", (req, res) => {
  res.sendFile(__dirname + "/public/main.html");
});
//클라이언트가 보낸 데이터 받는 방법
//[1]query string 데이터: req.query로 받는다 (get 방식)
//[2]요청경로에 포함된 데이터: req.params로 받는다
//[3]post방식으로 요청된 데이터: req.body로 받는다==> 설정 필요 (express body-parser)

app.get("/api/users", (req, res) => {
  console.log("req.query:", req.query);
  const { page, per_page } = req.query;
  //req.query.page, req.query.per_page 접근해도 된다.
  const str = `<h3>page: ${page}</h3>
  <h3>per_page:${per_page} </h3>
  해당 페이지의 User정보를 가져와 보여줄께요;
  <br><a href="/main">main</a>
   `;
  res.send(str);
});

app.get("/api/board/:no", (req, res) => {
  //:no 동적 세그먼트
  console.log("req.params:", req.params);
  //req.params.no
  const { no } = req.params;
  res.send(`<h3>${no} 번 게시글을 보여줄께요~</h3>`);
});

//get 방식으로 signin 요청이 들어오면 res.sendFile()을 이용해서 signin.html
//보여주세요.
app.get("/signin", (req, res) => {
  res.sendFile(__dirname + "/public/signin.html");
});

app.get("/signin2", (req, res) => {
  res.sendFile(__dirname + "/public/signin2.html");
});

app.get("/signinProc", (req, res) => {
  console.log("req.query:", req.query);
  const { userId, userPw } = req.query;
  if (userId === "killer") {
    res.status(405).send(`<h3 style='color:red'>접근할 수 없어요</h3>`);
  } else {
    res.send(`<h3 style='color:maroon'>환영합니다 ${userId}님~</h3>`);
    //querystring을 추출해서 응답을 보내주되
    //id가 'killer'라는 내용을 가지고 있으면 405 상태코드 보여주고
    //id가 'killer'제외 다른 아이디면 '환영합니다 id님~!' 보여주세요.
  }
});

//post 방식의 요청 처리 -------
//request의 body부분에 데이터를 포함시켜 요청을 보낸다.
app.post("/signinProc", (req, res) => {
  console.log(req.body); // post 방식의 데이터를 받을때: req.body 이용
  const { userId, userPw } = req.body;
  if (userId === "killer") {
    res.status(405).send(`<h3 style='color:red'>접근할 수 없어요</h3>`);
  } else {
    res.send(`<h3 style='color:maroon'>환영합니다 ${userId}님~</h3>`);
  }
});

app.post("/signinProc2", (req, res) => {
  const uid = req.body.userId;
  const upw = req.body.userPw;
  if (uid == "killer") {
    res.json({ status: 405, message: "Fail Killer는 접근 불가" });
    //json 형태의 응답을 보내고자 할때는 res.json()함수를 이용
  } else {
    res.json({ status: 200, message: `${uid}님 환영합니다~~` });
  }
});

app.get("*", (req, res) => {
  req.status(404).send(`<h1>404-해당 페이지는 없습니다</h1>`);
});

app.listen(7777, () => {
  console.log(`http://localhost:7777`);
});
