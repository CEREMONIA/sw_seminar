async function fetchWeather() {
  const apiKey =
    "PEo6WVzoRAWOuQ%2FoqMDeingSnHWexMzdwxlUPeIqO7GlR3Hj86%2BsyTcdvqJT5bduyl0Uewt5%2BEuNC7wTfJEVlA%3D%3D"; // Replace with your actual API key
  const endPoint =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
  const nx = "55"; // 나운 3동의 X 좌표
  const ny = "92"; // 나운 3동의 Y 좌표
  const now = new Date();
  const baseDate = now.toISOString().split("T")[0].replace(/-/g, "");
  const currentTime = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  let hour = now.getHours();
  let baseTime =
    hour < 2
      ? "2300"
      : hour < 5
      ? "0200"
      : hour < 8
      ? "0500"
      : hour < 11
      ? "0800"
      : hour < 14
      ? "1100"
      : hour < 17
      ? "1400"
      : hour < 20
      ? "1700"
      : "2000";
  const url = `${endPoint}?serviceKey=${apiKey}&dataType=JSON&numOfRows=60&pageNo=1&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const items = data.response.body.items.item;
    let currentTemp = 0,
      minTemp = 0,
      maxTemp = 0,
      weatherStatus = null; // Initialize variables with 0 or null

    items.forEach((item) => {
      switch (item.category) {
        case "T1H":
          if (!isNaN(parseFloat(item.fcstValue))) {
            currentTemp = parseFloat(item.fcstValue).toFixed(1); // 현재 기온
          }
          break;
        case "TMN":
          if (!isNaN(parseFloat(item.fcstValue))) {
            minTemp = parseFloat(item.fcstValue).toFixed(1); // 최저 기온
          }
          break;
        case "TMX":
          if (!isNaN(parseFloat(item.fcstValue))) {
            maxTemp = parseFloat(item.fcstValue).toFixed(1); // 최고 기온
          }
          break;
        case "SKY":
          if (item.fcstValue === "1") {
            weatherStatus = "☀️"; // 맑음
          } else if (item.fcstValue === "3") {
            weatherStatus = "☁️"; // 구름 많음
          } else if (item.fcstValue === "4") {
            weatherStatus = "🌧️"; // 흐림
          }
          break;
        case "PTY":
          if (item.fcstValue === "1") {
            weatherStatus = "🌧️"; // 비
          } else if (item.fcstValue === "2") {
            weatherStatus = "🌧️❄️"; // 비/눈
          } else if (item.fcstValue === "3") {
            weatherStatus = "❄️"; // 눈
          }
          break;
      }
    });

    const weatherBox = document.getElementById("weatherBox");
    weatherBox.innerHTML = `
          <p>현재 날짜: ${baseDate.substring(0, 4)}년 ${baseDate.substring(
      4,
      6
    )}월 ${baseDate.substring(6, 8)}일</p>
          <p>현재 시간: ${currentTime}</p>
          <p>현재 날씨: ${weatherStatus}</p>
          <p>현재 기온: ${currentTemp}°C</p>
          <p>오늘 최저기온: ${minTemp}°C</p>
          <p>오늘 최고기온: ${maxTemp}°C</p>
        `;
  } catch (error) {
    console.error("날씨 정보를 불러오는 데 실패했습니다.", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchWeather);
