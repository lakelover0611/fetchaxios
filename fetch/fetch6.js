const find = () => {
  const idVal = document.querySelector("#id").value;
  const divFrm = document.querySelector("#divFrm"); //div==> display:none, focus 주지말고 select

  //idVal 입력 안하고 클릭한 경우
  if (!idVal) {
    alert("ID를 입력해야 해요");
    document.querySelector("#id").focus();
    return;
  }
  //isNaN(): 값이 숫자가 아니면 true를 반환함.
  if (isNaN(idVal)) {
    alert("Id는 정수로 입력해야 해요");
    document.querySelector("#id").select();
    return;
  }
  //get으로 사용자 정보 조회해서 받은 데이터를 #divFrm>form>input의 value로 넣어주자
  getUserInfo(idVal); //정보 갖고와
}; //find()--------------------------------------

const getUserInfo = async (id) => {
  // //여기서 async await을 쓰는 이유는 순서적으로 수행해야 함. response를 받아오구, json으로 바꾸고. data를 갖고 오구.
  let url = `https://reqres.in/api/users/${id}`;
  try {
    const response = await fetch(url); //문자열이 json유형으로 오지만, json으로 만들어줘야 추출하기 쉬움. 문자열 index로 되어 있으면 짤라내서 넣어줘야함
    const data = await response.json();
    //alert(data);
    if (!data.data) {
      alert(`${id}번 회원은 없습니다`);
      return;
    }
    const { id: userId, first_name, last_name } = data.data; //별칭을 줘서 받음.
    frm.name.value = first_name + "  " + last_name;
    divFrm.style.display = "block"; // display none 하면 안보임. display block하면 보여짐.
  } catch (err) {
    alert("error:" + err); // 초기화
  }
};
//수정처리하는 메서드
const updateUser = async () => {
  try {
    //수정할 회원의 id값 받기
    const idVal = document.querySelector("#id").value;
    //수정한 정보 name하고 job 받기
    const data = {
      id: idVal,
      name: frm.name.value,
      job: frm.job.value,
    };
    //유효성 체크 (옵션)
    if (!data.job) {
      alert("직업을 수정할 값을 입력하세요");
      frm.job.focus();
      return;
    }
    //put메서드로 요청보내기
    updateUserProcess(data);
    //응답 데이터를 받아서
    //id가 result인 곳 출력하기 (name,job, updated At)
  } catch (error) {
    alert("Error:" + error);
  }
};

///----------------
const updateUserProcess = async (data) => {
  event.preventDefault();
  try {
    let url = `https://reqres.in/api/users/${data.id}`;
    console.log(url);
    const response = await fetch(url, {
      //fetch 옵션을 줄때 중괄호로 줘야함. json유형으로 보낼께.
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    const { name, job, updatedAt } = responseData;
    const result = document.getElementById("result");
    result.innerHTML = `
        <h2>수정된 회원정보</h2>
        <h3>id: ${data.id}</h3> //input element가 나옴 
        <h3>name: ${name}</h3>
        <h3>job: ${job}</h3>
        <h3>updateddAt: ${updatedAt} </h3>
        `;
    frm.name.value = ""; //입력 폼의 input 값 비우기
    frm.job.value = "";
    document.querySelector("#id").value = "";
    const divFrm = document.getElementById("divFrm");
    divFrm.style.display = "none"; //감추기
  } catch (error) {
    alert("error: " + error);
  }
};
