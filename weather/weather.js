import axios from "https://cdn.skypack.dev/axios"; //axios 라이브러리 가져오기

const locationAlert = document.querySelector("#location");
const weatherAlert = document.querySelector("#weather");
const errorAlert = document.querySelector("#error");

const showError = (message) => {
  //오류 메시지 보여주기
  errorAlert.textContent = `Error: ${message}`;
  errorAlert.style.display = "block";
};
const showLocation = (lat, long, addr) => {
  //위도와 경도 정보 화면 표시
  locationAlert.innerHTML = `
  <h4>Latitude: ${lat}, Longitude: ${long}</h4>
  <h4>Address: ${addr} </h4>
  `;
  locationAlert.style.display = "block";
};

//사용자의 위치 정보 불러오기
const getCurrentLocation = () => {
  //사용자 위치정보 얻기
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        //debugging logs
        console.log(`Latitude: ${lat}, Longitude: ${long}`);

        if (lat && long) {
          const address = await fetchAddress(lat, long); //위도 경도 지역주소 문자열로 얻기
          showLocation(lat, long, address); // 현재 위치 정보 출력하는 함수
          fetchWeather(lat, long); // axios 이용해서 날씨정보 받아오는 함수
        } else {
          showError("Location data is incomplete");
        }
        //여기서 id가 result인 곳에 위도 경도 출력하세요
      },
      (error) => {
        showError("Geolocation error:" + error.message);
      }
    );
  } else {
    showError("Geolocation is not supported by this browser");
  }
};

//OpenWeather API로 요청을 보내는 함수              //주어진 위도와 경도의 위치정보 제공
const fetchWeather = async (lat, long) => {
  console.log(lat, long);
  const url = `https://api.openweathermap.org/data/2.8/onecall?lat=37.5390833&lon=126.9023575&exclude=hourly,daily,minutely&appid=56790ee75f408c3f4cccf562a90963bd`;
  const response = await axios.get(url);
  console.log(response.data);

  //timezone, temp
  //온도가 캘빈단위 ==>섭씨로 변환 : K-273.15
  //WeatherAlert에 출력

  const { timezone } = response.data;
  const { temp } = response.data.current;
  const { description, icon } = response.data.current.weather[0];

  showWeather(timezone, temp, description, icon);

  //weatherAlert.innerHTML = `<h4>${timezone}, ${temp}, ${description}, ${icon}</h4>`;
  //weatherAlert.style.display = "block";
};
const showWeather = (timezone, temp, desc, icon) => {
  const cw = temp - 273.15; // 섭씨로 변환
  weatherAlert.innerHTML = `<h4>Timezone: ${timezone} </h4>
   <h4>Temperature: ${cw.toFixed(2)}</h4>
   <h4>Description: ${desc} </h4>
   <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
   `;
  weatherAlert.style.display = "block";
}; //getcurrentlocation

const fetchAddress = async (lat, lon) => {
  //위도, 경도 값으로 해당 지역정보를 문자열로 받아오는 함수
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`; //api 응답을 json형식으로 받아야 나옴
  try {
    const response = await axios.get(url); //
    //const { display_name } = response.data;
    //return display_name;
    const { country, city, borough } = response.data.address;
    const addr = `${country} ${city} ${borough}`;
    return addr;
  } catch (error) {
    showError("주소 가져오기 실패: " + error.message);
    return "Unknown Location";
  }
}; //------------------------------------------------

document.addEventListener("DOMContentLoaded", getCurrentLocation); //DOM이 완전히 로드된 후 GetCurrentlocatiob 함수 호출하도록 이벤트 리스너 설정
//Dom이 로드되면 getcurrentlocation함수를 불러옴
//dom 로드 후 제일 먼저 불를 함수 정하기. 위치정보를 받아와야지 날씨를 구할 수 있자나.
