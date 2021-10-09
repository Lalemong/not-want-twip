const init = e => {
  const $yes = document.querySelector("#yes");
  const $no = document.querySelector("#no");
  const $popup = document.querySelector("#popup");
  const $game = document.querySelector("#game");
  const $pass = document.querySelector("#pass");
  const $pad = document.querySelector("#pad");
  const $ex = document.querySelector("#ex");
  const $reset = document.querySelector("#reset");
  const $retry = document.querySelector("#retry");
  const number = [0,1,2,3,4,5,6,7,8,9];
  let answer = "";
  let sheet = "";
  let closePopup = false;
  let skip = "";
  
  const gameStart = e => {
    const btns = $pad.querySelectorAll(".btn");
    btns.forEach(el => el.remove());
    $pass.value = "";
    sheet = "";
    
    number.sort(e => Math.random() - 0.5);
    answer = number.join("");
    $ex.innerText = answer;
  
    number.sort(e => Math.random() - 0.5);
    for(let i = 0; i < 10; i++) {
      const btn = document.createElement("div");
      btn.classList.add("btn");
      btn.innerText = number[i];
  
      btn.addEventListener("click", e => {
        sheet += `${number[i]}`;
        $pass.value = sheet;
        btn.classList.add("use");
  
        if(sheet.length === 10) {
          if(sheet === answer) {
            location.replace("https://twip.kr/l_l_mong1122");
          }else {
            $reset.classList.remove("none");
            $game.style.pointerEvents = "none";
          }
        }
      })
  
      $pad.append(btn);
    }
  }
  
  $no.addEventListener("click", e => {
    window.close();
  })
  
  $yes.addEventListener("click", e => {
    $popup.classList.remove("none");
  
    gameStart();
  })
  
  $pass.addEventListener("keydown", e => {
    e.preventDefault();
    $pass.value = sheet;

    if(e.key.length === 1)skip += e.key.replace(/[^a-z|A-Z]/g, "");
    if(skip === "Slime") location.replace("https://twip.kr/l_l_mong1122");
    if(e.key === "Backspace") skip = skip.slice(0, skip.length - 1);
  })
  
  $pass.addEventListener("input", e => {
    e.preventDefault();
    $pass.value = sheet;
  })
  
  $pass.addEventListener("contextmenu", e => {
    e.preventDefault();
    $pass.value = sheet;
  })
  
  $popup.addEventListener("mousedown", e => {
    if(e.target === $popup) {
      closePopup = true;
    }
  });
  
  $popup.addEventListener("mouseup", e => {
    if(e.target === $popup && closePopup) {
      $popup.classList.add("none");
      $reset.classList.add("none");
      $game.style.pointerEvents = "";
    }
    closePopup = false;
  });
  
  $retry.addEventListener("click", e => {
    $reset.classList.add("none");
    $game.style.pointerEvents = "";
  
    gameStart();
  })
}

init();