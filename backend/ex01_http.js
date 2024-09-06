//ex01_http.js
const http = require("http");
const server = http.createServer(); //서버 생성

//클이 접속하여 연결이 이뤄질때
server.on("connection", function (socket) {
  console.log("Connection On");
  //서버의 IP주소
  const serverIp = socket.address();
  console.log(serverIp); //::1 ==> IPv6의 루프백 주소를 나타내는 것으로 로컬호스트를 의미
  console.log("=========="); // IPv5 주소의 172.30.1.91
  //클라이언트의 IP주소
  const clientIP = socket.remoteAddress;
  console.log(clientIP + "님이" + serverIp.address + "서버에 접속했어요");
});

server.on("close", function () {
  console.log("Close On: 서버가 종료됨");
});

//웹서버 종료시 발생
// server.on("close", function () {
//   console.log("Close On: 서버가 종료됨...");
// });
//브라우저(클라이언트)가 요청을 보내면 request 이벤트 발생
//핸들러 함수에 request/response가 매개변수로 들어온다.

server.on("request", function (req, res) {
  console.log("Request On: 클라이언트의 요청이 들어왔어요");
  //res: 응답과 관련된 객체 ==> 브라우저와 연결되어 있다
  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" }); //헤더에 쓰기
  res.write("<h1>Hello Node Server...</h1>"); //body에 쓰기
  res.write("<h2>안녕하세요?</h2>");
  res.end(); //응답을 모두 보냈다는 의미. end()호출될 때 브라우저에 응답을 전송한다
});
server.listen(3333, function () {
  console.log("http://172.30.1.91:3333 에서 서버가 시작되었어요");
});

//3초 후에 서버를 종료시켜보자 => close 이벤트 발생
// setTimeout(() => {
//   server.close(() => {
//     console.log("server shutdown");
//   });
// }, 3000);

//Request메시지가 전달됨. 응답 보내보기
