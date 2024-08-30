function createUser() {
  //서버에 submit하지 못하도록 기본동작을 막자
  event.preventDefault(); //비동기 방식으로 네트워크 통신해야함
  //사용자가 입력한 값 받기. name,job
  //let name = document.getElementById("name").value;
  //form네임.input네임.value
  const data = {
    // 서버에 전송할 데이터를 만들어준 것임, 사용자가 입력한 값
    name: frm.name.value,
    job: frm.job.value,
  };
  console.log("data: ", data);

  //유효성 체크, 입력 받으면 유효성 검사를 함.
  if (!data.name) {
    alert("이름을 입력해 주세요");
    frm.name.focus(); //입력포커스 주기
    return;
  }
  if (!data.job) {
    alert(`직업을 입력하세요`);
    frm.job.focus();
    return;
  }
  registerUser(data);
}
//async await 응답이 올때까지 좀 기달려
async function registerUser(data) {
  //data 매개변수를 db에 저장  vice versa
  const url = `https://reqres.in/api/users`;
  try {
    const response = await fetch(url, {
      //post 방식일때는 옵션을 기술하자
      method: "POST", //get은 default라 안적어줘도됨.
      headers: {
        //request 편지의 header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), //post방식으로 전송할 데이터를 json 객체가 가니라 json 형태의 문자열로 만들어 보내야 함.
    }); //json 형식으로 서버에 보내야함
    const responseData = await response.json(); //얘가 json으로 올때까지 변환을 해서 좀 기다려
    console.log(responseData);
    const { name, job, id, createdAt } = responseData;
    const result = document.querySelector(`#result`);
    result.innerHTML = `
    <h2>등록된 회원 정보</h2>
    <h3>Id: ${id}</h3>
    <h3>Name: ${name}</h3>
    <h3>Job: ${job}</h3>
    <h3>createdAt: ${createdAt} </h3>
    `;
    //alert(response);
  } catch (error) {
    console.error(error);
    alert(error);
  }
}
