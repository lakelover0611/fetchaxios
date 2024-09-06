const express = require("express");

const app = express();
//Express는 (proxy와 같은)미들웨어를 쓸 수 있음.
//정적인 파일들을 인식시키도록 static미들웨어를 사용하자
//express.static()===> 정적인 파일들의 경로를 인식시킬 수 있다.
app.use(express.static(__dirname + "/public"));
//public 폴더 내에 정적 파일들(css, image파일, 멀티미디어파일, js)
// 브라우저에서 접근 가능함. 다만 요청 주소를 보낼때 'public'은 포함되지 않음에 주의
//http://localhost:5555/images/login.png
//http://localhost:5555/images/index.html

app.get("/index", (req, res) => {
  //fs.readFile()이용해서 'public/index.html을 가져와 보여주기
  //대신 res.sendFile()을 사용할 수 있다
  console.log(__dirname + "/public/index.html");
  res.sendFile(__dirname + "/public/index.html");
});

// '/login' ==> 'public/images/login.png' 이미지를 브라우저에 출력하기
app.get("/login", (req, res) => {
  //   res.sendFile(__dirname + "/public/images/구글.png");
  const str = `<h1>Login Page</h1>
  <img src= "/images/구글.png">`;
  res.send(str);
});
// `/board` ==> 'public/images/board.png' 이미지를 브라우저에 출력하기
app.get("/board", (req, res) => {
  res.sendFile(__dirname + "/public/images/뽀로로.png");
});

app.listen(5555, () => {
  console.log(`http://localhost:5555`);
});

//server는 public을 몰름.
