const bt1 = document.querySelector("#btn1");
const bt2 = document.querySelector("#btn2");

const url = `https://www.hankyung.com/feed/it`;
// 한경닷컴 서버로 직접 요청을 보내보자 ==> 도메인 달라서 에러 발생(cors 오류).
//  reqres는 서버시스템에서 domain이 달라도 받아올 수 있도록 해서 되는 것임...

const proxy_url = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.hankyung.com%2Ffeed%2Fit`;
//중간 대리 서버(proxy server)를 이용해서 한경닷컴에 요청을 보내 응답을 받는다.
//이 대리서버는 받은 응답(xml)을 json으로 변환(convert)해서
//우리에게 응답을 보내준다.

bt1.addEventListener("click", () => {
  axios
    .get(url)
    .then((response) => alert(response))
    .catch((error) => alert(`error:` + error));
});

bt2.addEventListener("click", () => {
  axios
    .get(proxy_url) // 기사갯수를 N개 보여주기
    .then((response) => {
      //alert(JSON.stringify(response));
      showNews1(response.data);
    })
    .catch((error) => alert(`error:` + error));
});

// const showNews = (data) => {
//   const list = data.items; //배열
//   console.log("list.length:", list.length);
//   const result = document.querySelector("#newsContainer");
//   // ul li 태그 이용해서 아까처럼 title 출력하고 해당 title의 링크 걸어주기
//   let str = "<ul>";
//   //반복문 돌면서 str에 누적시키자
//   for (let i = 0; i < list.length; i++) {
//     const item = list[i];
//     const { title, link } = item;
//     //console.log(item);
//     str += `
//     <li>
//         <a href="${link}" target="_blank">${title}</a>
//     </li>
//     `;
//   }
//   str += "</ul>";
//   result.innerHTML = str;
// };

//for문 말고 map함수로 써보기
const showNews1 = (data) => {
  const list = data.items; //배열
  //뉴스 날짜
  const pubDate = list[0].pubDate; //모든 item 다 pubdate 동일하므로 첫번째꺼 가져옴
  document.querySelector("#today").innerText = pubDate;
  console.log("list.length:", list.length);
  const result = document.querySelector("#newsContainer");
  // ul li 태그 이용해서 아까처럼 title 출력하고 해당 title의 링크 걸어주기
  let str = "<ul>";
  //반복문 돌면서 str에 li 누적시키기. for of / 배열.forEach() /map()
  //배열.map(콜백함수): 반환타입 => 새로운 배열을 반환.. 배열을 목록태그로 출력해 반환
  //배열을 문자열로 변환할려면: "배열.join(구분자) ===> 문자열을 반환
  const newArr = list.map((item) => {
    //item은 배열에 저장된 값
    const { title, link } = item;
    return `
     <li>
     <a href="{link}" target="_blank">
     ${title}
     </a>
     </li>
     `;
  });
  //newArr: map()이 반환하는 배열
  //str+=newArr; //이렇게 하면 안된다.
  str += newArr.join(" "); //배열에 저장된 값들을 문자열로 반환
  str += "</ul>";
  result.innerHTML = str;
};
