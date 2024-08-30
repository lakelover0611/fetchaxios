const result = document.getElementById("result");
const paging = document.getElementById("paging");

const getAllUser = (page, perPage) => {
  //page: 페이지번호, perPage: 한 페이지에 보여줄 목록 개수
  const url = `https://reqres.in/api/users?page=${page}&per_page=${perPage}`; ///page당 보여주게써
  console.log(url);
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("데이터가 없거나 네트워크 에러");
      return response.json();
    })
    .then((data) => {
      if (data.data.length == 0) {
        alert("데이터가 없습니다");
      } else {
        renderUI(data);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

//반복문
const renderUI = (data) => {
  const { page, per_page, total, total_pages, data: userList } = data;
  console.log("total:", total); //게시글 수
  console.log("per_page: ", per_page); //한 페이지에 보여줄 목록 개수
  console.log("total_page:", total_pages); //총 페이지 수

  let str = `<table class= "table">
    <tr>
      <th>Id</th>
      <th>Image</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
    `;
  //반복문
  for (let i = 0; i < userList.length; i++) {
    let user = userList[i]; //객체: user
    str += `
          <tr>
          <td>${user.id}</td>
          <td><img src="${user.avatar}" alt="회원 이미지"></td> 
          <td>${user.first_name}  ${user.last_name}</td>
          <td>${user.email}</td>
          </tr>
          `;
  }
  str += `</table>`;
  //페이지 네비게이션 문자열 만들기

  let pageStr = "";
  for (let p = 1; p <= total_pages; p++) {
    pageStr += `<button onclick="getAllUser(${p}, ${per_page})">${p}</button>`;
    //페이지번호 클릭할 때 마다 해당 페이지 데이터 가져오도록
  }
  result.innerHTML = str;
  paging.innerHTML = pageStr;
};
