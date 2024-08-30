const bt1 = document.querySelector("#btn1");
bt1.addEventListener("click", () => {
  const url = "news.json";
  axios
    .get(url)
    .then((response) => {
      //alert(JSON.stringify(response));
      const newsItem = response.data.item;
      console.log(newsItem);
      const result = document.querySelector("#newsContainer");
      result.innerHTML = `
        <a href="${newsItem.link}" target= "_blank"><h2>${newsItem.title}</h2></a> 
        <h2>${newsItem.author}</h2>
        <h2>${newsItem.link}</h2>
      `; //<a>로 링크 달기, target=_blank로 새창 띄어주기
    })
    .catch((error) => alert(error));
});
