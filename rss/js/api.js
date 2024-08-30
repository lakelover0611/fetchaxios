import axios from "https://cdn.skypack.dev/axios";

const getNews = async (urlProxy) => {
  try {
    const response = await axios.get(urlProxy);
    return response.data;
  } catch (error) {
    alert("Proxy API 호출 중 에러:" + error);
  }
};

//우리가 쓴 axios는 모듈화가 안됨.
export { getNews };
