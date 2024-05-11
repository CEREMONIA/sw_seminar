// 알람 추가 버튼 클릭 시
document
  .getElementById("addAlarmButton")
  .addEventListener("click", function () {
    addAlarm();
  });

// 알람 추가 함수
function addAlarm() {
  const alarmTime = document.getElementById("alarmTimeInput").value;
  if (alarmTime) {
    const alarm = document.createElement("div");
    alarm.classList.add("alarm");
    alarm.innerHTML = `<span>${alarmTime}</span><button class="removeAlarmButton">삭제</button>`;
    document.querySelector(".alarm-list").appendChild(alarm);
    // 삭제 버튼에 이벤트 핸들러 추가
    alarm
      .querySelector(".removeAlarmButton")
      .addEventListener("click", function () {
        removeAlarm(alarm);
      });
  } else {
    alert("알람 시간을 입력하세요.");
  }
}

// 알람 삭제 함수
function removeAlarm(alarm) {
  alarm.remove();
}
