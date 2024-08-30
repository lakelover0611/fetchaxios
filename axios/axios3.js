function fetchXML() {
  const url = "note.xml";
  axios
    .get(url, {
      responseType: "text",
    })
    .then((response) => {
      //alert(response.data); //xml 데이터를 parsing해서 메모리에 올려서 돔으로 접근할 수 있게 하는 것임.
      const parser = new DOMParser(); //
      const xml = parser.parseFromString(response.data, "application/xml"); //문자열로부터 parse해서 결과를 돌려줘야함.
      //note element에 접근해보자
      const notes = xml.getElementsByTagName("note");
      //alert(notes.length);
      const result = document.querySelector("#result");
      result.innerHTML = `<h2>Note 목록</h2>`;
      for (const note of notes) {
        //note엘리먼트의 no라는 속성값 추출: getattribute
        const no = note.getAttribute("no");
        const to = note.getElementsByTagName("to")[0].textContent;
        const from = note.getElementsByTagName("from")[0].textContent;
        const heading = note.getElementsByTagName("heading")[0].textContent;
        const body = note.getElementsByTagName("body")[0].textContent;
        //console.log(to);
        result.innerHTML += `
         <div style="width:60%; margin:auto; border:1px solid silver; padding:1em">
            <h3>No: ${no}</h3>
            <h3>To: ${to} </h3>
            <h3>From: ${from} </h3>
            <h3>Heading: ${heading} </h3>
            <h3>Body: ${body} </h3>
         </div>
         `;
      }
    })
    .catch((error) => alert("error:" + error));
}
