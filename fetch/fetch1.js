const bt1 = document.querySelector("#btn1");
const result = document.querySelector("#result");
const url = "singleUser.json";

bt1.onclick = () => {
  getUserInfo(url);
};

const getUserInfo = (url) => {
  fetch(url)
    .then((response) => {
      //alert(response.ok);
      if (!response.ok)
        throw new Error("요청이 잘못됐거나 네트워크에 문제가 있습니다");
      return response.json(); //JSON.parse(xhr.responseText)
    })
    .then((data) => {
      //alert(JSON.stringify(data)); //data=>json객체
      const { id, first_name, last_name, email, avatar } = data.data;
      console.log(id, first_name, last_name, email, avatar);
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
