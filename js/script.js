  //inisialiasi variabel untuk menampung elemen dokumen
  const localTotalVictoryField = document.getElementById("local-total-victory-field");
  const localMaximumAttempField = document.getElementById("local-maximum-attemp-field");
  const destroyDataButton = document.getElementById("destroy-data-button");
  const playButton = document.getElementById("play-button");
  const beforeGameDisplay = document.getElementById("before-game-display");
  const duringGameDisplay = document.getElementById("during-game-display");
  const afterGameDisplay = document.getElementById("after-game-display");
  const answerButton1 = document.getElementById("answer-1-button");
  const answerButton2 = document.getElementById("answer-2-button");
  const answerButton3 = document.getElementById("answer-3-button");
  const sessionUserAnswerField = document.getElementById("session-user-answer-field");
  const sessionUserWrongAnswerField = document.getElementById("session-user-wrong-answer-field");
  const sessionTrueAnswerField = document.getElementById("session-true-answer-field");
  const sessionUserAttempsField = document.getElementById("session-user-attemps-amount-field");

  //inisialisasi fungsi untuk menghasilkan jawaban permainan
  function getAnswer() {
      let answer = "123".split("");
      for (let i = 0; i < answer.length; i++) {
          let j = Math.floor(Math.random() * (i + 1));
          let tmp = answer[i];
          answer[i] = answer[j];
          answer[j] = tmp;
      }
      return answer.join("");
  }

  //inisialiasi key untuk session storage
  const sessionAnswerKey = "SESSION_ANSWER";
  const sessionUserAttempsKey = "SESSION_USER_ATTEMPS";
  const sessionUserIsPlayingKey = "SESSION_USER_IS_PLAYING";

  //inisialisasi key untuk local storage
  const localTotalVictoryKey = "LOCAL_TOTAL_VICTORIES_PLAYED";
  const localMaximumAttempsKey = "LOCAL_MAXIMUM_ATTEMPTS";

  //kondisi ketika load terjadi
  window.addEventListener("load", function () {
      if (typeof(Storage) !== "undefined"){
            if (sessionStorage.getItem(sessionAnswerKey) === null) {
                sessionStorage.setItem(sessionAnswerKey, "");
            } if (sessionStorage.getItem(sessionUserAttempsKey) === null) {
                sessionStorage.setItem(sessionUserAttempsKey, 0);
            } if (sessionStorage.getItem(sessionUserIsPlayingKey) === null) {
                sessionStorage.setItem(sessionUserIsPlayingKey, false);
            } if (localStorage.getItem(localTotalVictoryKey) === null) {
                localStorage.setItem(localTotalVictoryKey,0);
            } if (localStorage.getItem(localMaximumAttempsKey) === null) {
                localStorage.setItem(localMaximumAttempsKey, 0);
            }
      } else {
          alert("Browser yang anda gunakan tidak mendukung Web Storage")
      }
      sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey);
      localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
      localMaximumAttempField.innerText = localStorage.getItem(localMaximumAttempsKey);
  });

  //Play button for game 
  playButton.addEventListener("click", function () {
      sessionStorage.setItem(sessionAnswerKey, getAnswer());
      sessionStorage.setItem(sessionUserIsPlayingKey, true);
      beforeGameDisplay.setAttribute("hidden", true); //sembunyikan
      duringGameDisplay.removeAttribute("hidden"); //tampilkan

  });

  //Number button
  answerButton1.addEventListener("click", function () {
      sessionUserAnswerField.innerText += "1";
      if (sessionUserAnswerField.innerText.length == 3) {
          checkAnswer(sessionUserAnswerField.innerText);
      }
  });

  answerButton2.addEventListener("click", function () {
    sessionUserAnswerField.innerText += "2";
    if (sessionUserAnswerField.innerText.length == 3) {
        checkAnswer(sessionUserAnswerField.innerText);
    }
});

answerButton3.addEventListener("click", function () {
    sessionUserAnswerField.innerText += "3";
    if (sessionUserAnswerField.innerText.length == 3) {
        checkAnswer(sessionUserAnswerField.innerText);
    }
});

//function check answer
function checkAnswer(userGuess) {
    const answer = sessionStorage.getItem(sessionAnswerKey);
    //jika jawaban benar
    if (userGuess == answer) {
        //gamebord duringgamedisplay akan hidden
        duringGameDisplay.setAttribute("hidden", true);
        //gamebord aftergamedisplay akan tampil
        afterGameDisplay .removeAttribute("hidden");
        //tampilkan hasil
        sessionTrueAnswerField.innerText = answer;
        //update score
        updateScore();
    } else {
        //ambil id jumlah tebakan salah melalui session storage
        const previousAttempAmount = parseInt(sessionStorage.getItem(sessionUserAttempsKey));
        //lalu tambah 1 jika salah
        sessionStorage.setItem(sessionUserAttempsKey, previousAttempAmount+1);
        //masukkan ke session yang jumlah tebakan yang salah
        sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey);
        //kosongkan field answer
        sessionUserAnswerField.innerText = "";
        //tampilkan data yang salah ke field answer yang salah
        sessionUserWrongAnswerField.innerText = userGuess;
    }
};

//function update score
function updateScore() {
    //BENAR
    //ambil data total kemenangan
    const previousTotalVictoryAmount = parseInt(localStorage.getItem(localTotalVictoryKey));
    //set local storage kemenangan dengan data total kemenangan
    localStorage.setItem(localTotalVictoryKey, previousTotalVictoryAmount+1);
    localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);

    //SALAH
    //ambil jumlah tebakan salah
    const sessionAttempsValue = parseInt(sessionStorage.getItem(sessionUserAttempsKey));
    //ambil jumlah tebakan salah sekali main
    const localAttempsValue = parseInt(localStorage.getItem(localMaximumAttempsKey));
    //cek apakah jumlah tebakan salah > dari Jumlah tebakan salah terbanyak sekali main
    if (sessionAttempsValue > localAttempsValue) {
        //set data maximum dengan nilai data yang salah
        localStorage.setItem(localMaximumAttempsKey, sessionAttempsValue);
        //masukkan jumlah tebakan selah sekali main
        localMaximumAttempField.innerText = sessionAttempsValue;
    }
};

//function sebelum unload
window.addEventListener("beforeunload", function () {
    sessionUserAnswerField.innerText = "";
    sessionUserWrongAnswerField.innerText = "";
    sessionStorage.setItem(sessionUserAttempsKey, 0);
    sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey);
});
