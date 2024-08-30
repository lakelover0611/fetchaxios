const url = `https://reqres.in`;
const bt1 = document.getElementById("btn1");
const result = document.querySelector("#result");

btn1.onclick = function () {
  const findId = prompt("검색할 회원의 Id 번호를 입력하세요");
  if (!findId) {
    return;
  }
  const newUrl = url + `/api/users/${findId}`;
  console.log(newUrl);
  getUserInfo(newUrl);
};

const getUserInfo = (newUrl) => {
  //fetch()이용해서 데이터 받아서 #result에 출력하세요
  fetch(newUrl)
    .then((response) => {
      //alert(response.ok);
      if (!response.ok)
        throw new Error("요청이 잘못됐거나 네트워크에 문제가 있습니다"); //fetch.then.then 수행을 순차적으로 하기 위해서 씀.
      return response.json(); //JSON.parse(xhr.responseText)
    })
    .then((data) => {
      //alert(JSON.stringify(data)); //data=>json객체
      // const { id, first_name, last_name, email, avatar } = data.data;
      // console.log(id, first_name, last_name, email, avatar);
      renderUI(data);
    })
    .catch((error) => {
      alert("Error:" + error);
    });
}; //getUserInfo()-----------------------------

const renderUI = (data) => {
  const { id, first_name, last_name, email, avatar } = data.data;
  // console.log(id, first_name, last_name, email, avatar);
  result.innerHTML = `
  <h2>회원 정보</h2>
  <img src="${avatar}">
  <h3>Id:${id} </h3>
  <h3>Name: ${first_name} ${last_name}</h3>
  <h3>Email:${email} </h3>
  `;
};
