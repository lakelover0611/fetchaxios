const bt1 = document.querySelector("#btn1");
const result = document.querySelector("#result");
bt1.onclick = () => {
  // 버튼 클릭시 조회할 페이지번호로 이동
  const pageNo = prompt("조회할 페이지 번호를 입력하세요");
  if (!pageNo) return;
  let url = `https://reqres.in/api/users?page=${pageNo}`;
  getAllUser(url);
};
const getAllUser = (url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("데이터가 없거나 네트워크 에러입니다");
      return response.json();
    })
    .then((data) => {
      //alert(JSON.stringify(data));
      const { data: userList } = data;
      //console.log(page, per_page, total, total_pages);
      //console.log(userList);
      if (userList.length == 0) {
        result.innerHTML = `<h2 style="color:red">요청한 페이지의 데이터는 없어요</h2>`;
      } else {
        renderUI(data);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

const renderUI = (data) => {
  const { page, per_page, total, total_pages, data: userList } = data;
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
        <td><img src="${user.avatar}" alt="회원 이미지"></td> //이미지 없을 시 뭐 나올지 지정 
        <td>${user.first_name}  ${user.last_name}</td>
        <td>${user.email}</td>
        </tr>
        `;
  }
  str += `</table>`;
  result.innerHTML = str;
};
