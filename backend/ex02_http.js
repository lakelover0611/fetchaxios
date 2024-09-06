const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer((req, res) => {
    //서버 생성
    if (req.url == "/") {
      //public/index.html 파일을 읽어서 브라우저에 출력
      //fs의 readfile()을 이용해서 읽은 내용을 브라우저에 출력
      const filePath = path.join("public", "index.html");
      console.log("filePath: ", filePath); //public/index.html
      console.log(path.resolve(filePath)); //절대경로
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          console.log("파일이 없어요: ", err);
          throw err;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(data);
        res.end();
      });
    } else if (req.url == "/login") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(`<h1 style='color:green'>Login Page</h1>`);
      res.write('<a href="/">index페이지로</a>');
      res.end(); // end 불러내야 브라우저에 출력해줌
    } else if (req.url == "/board") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(`<h1 style='color:maroon'>BoardPage</h1>`);
      res.end(`<a href='/'>index페이지로</a>`);
    }
  })
  .listen(3333, () => {
    console.log(`http://localhost:3333`);
  });
