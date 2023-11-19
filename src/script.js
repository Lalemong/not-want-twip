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
  const $profile = document.querySelector("#profile>img");
  const number = [0,1,2,3,4,5,6,7,8,9];
  const profiles = ["profile01.png", "profile02.png", "profile03.png", "profile04.png", "profile99.png"];
  let answer = "";
  let sheet = "";
  let closePopup = false;
  let skip = "";
  let date = new Date();
  const randomProfile = Math.random() * 100;

  if(randomProfile < 23) $profile.src = "src/profile/" + profiles[0];
  else if(randomProfile < 46) $profile.src = "src/profile/" + profiles[1];
  else if(randomProfile < 69) $profile.src = "src/profile/" + profiles[2];
  else if(randomProfile < 92) $profile.src = "src/profile/" + profiles[3];
  else $profile.src = "src/profile/" + profiles[4];

  const replaceButtons = requestButtons => {
    const prevNumber = number.slice();
    const randomNumber = [];
    const usedNumber = [];
    const resultNumber = [];
    const emptyElement = document.createElement("div");

    const $numbers = document.querySelectorAll("#pad .btn");

    for(let i = 0; i < $numbers.length; i++) {
      const $number = $numbers[i];

      if($number.classList.contains("use")) usedNumber.push(number[i]);
      else randomNumber.push(number[i]);

      emptyElement.append($number);
    }
    
    randomNumber.sort(e => {
      return Math.random() - 0.5;
    });

    let usedCount = 0;
    for(let i = 0; i < number.length; i++) {
      if(usedNumber.includes(prevNumber[i])) {
        resultNumber.push(prevNumber[i]);

        usedCount++;
      }else { 
        resultNumber.push(randomNumber[i - usedCount]);
      }
    }

    for(let i = 0; i < number.length; i++) {
      $pad.append(requestButtons[resultNumber[i]]);
    }
  }
  
  const gameStart = e => {
    const btns = $pad.querySelectorAll(".btn");
    const requestButtons = {};
    let mixNumber = true;
    let mixingNumber = "";
    btns.forEach(el => el.remove());
    $pass.value = "";
    sheet = "";
    
    while(mixNumber) {
      number.sort(e => {
        return Math.random() - 0.5;
      });

      answer = number.join("");
      $ex.innerText = answer;
      
      number.sort(e => {
        return Math.random() - 0.5;
      });

      let mixedNumber = number.join("");

      let includedSequence = false;
      let includedMixed = false;
      let sequence = "0123456789";
      let answerCopy = answer;

      for(let j = 0; j < 2; j++) {
        for(let i = 0; i < 8; i++) {
          let subNumber = sequence.substring(i, i + 3);
  
          if(mixedNumber.includes(subNumber)) {
            includedSequence = true;

            break;
          }
        }
  
        for(let i = 0; i < 8; i++) {
          let subNumber = answerCopy.substring(i, i + 3);
  
          if(mixedNumber.includes(subNumber)) {
            includedMixed = true;

            break;
          }
        }

        sequence = sequence.split("");
        answerCopy = answerCopy.split("");
        sequence.reverse();
        answerCopy.reverse();
        sequence = sequence.join("");
        answerCopy = answerCopy.join("");
      }

      
      if(mixedNumber === answer) ;
      else if(includedSequence) ;
      else if(includedMixed) ;
      else mixNumber = false;
    }

    if(randomProfile >= 92) {
      mixingNumber = answer[Math.floor(Math.random() * 4 + 3)] * 1;
    }
    
    for(let i = 0; i < 10; i++) {
      const btn = document.createElement("button");
      btn.classList.add("btn");
      btn.innerText = number[i];
      if(mixingNumber === number[i]) btn.classList.add("mix");
  
      btn.addEventListener("click", e => {
        if(btn.classList.contains("use")) return e.preventDefault();
        sheet += `${number[i]}`;
        $pass.value = sheet;
        btn.classList.add("use");

        if(mixingNumber === number[i]) replaceButtons(requestButtons);
  
        if(sheet.length === 10) {
          if(sheet === answer) {
            location.replace("https://twip.kr/l_l_mong1122");
          }else {
            $reset.classList.remove("none");
            $game.style.pointerEvents = "none";
            skip = "";
          }
        }
      })
  
      $pad.append(btn);
      requestButtons[number[i]] = btn;
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
  
  $pass.addEventListener("keypress", e => {
    e.preventDefault();
    $pass.value = sheet;

    if(e.key.length === 1)skip += e.key.replace(/[^a-z|A-Z]/g, "");
    if(skip === "Slime") location.replace("https://twip.kr/l_l_mong1122");
    if(e.key === "Backspace") skip = skip.slice(0, skip.length - 1);

    $ex.innerText = sheet;
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

  if(date.getMonth() === 11 || date.getMonth() === 0 || (date.getMonth() === 10 && date.getDate() > 15)) {
    const body = document.querySelector("body");
    const page = {w: window.innerWidth, h: window.innerHeight};
    const particle = [];
    const snow = new Image;
    const tree = new Image;
    const pi = Math.PI;
    let prevMs = new Date().getTime();
    let imgLoad = 0;
    let averageMs = 0;
    let prevAverageMs = 0;

    const snowBackground = document.createElement("canvas");
    const sCtx = snowBackground.getContext("2d");
    snowBackground.classList.add("snow-background");
    
    snowBackground.width = page.w;
    snowBackground.height = page.h;

    snow.src = "src/snow/snow.png";
    tree.src = "src/snow/tree.png";

    snow.onload = e => {
      imgLoad++;
    }
    tree.onload = e => {
      imgLoad++;
      tree.width = 140;
    }
    
    window.addEventListener("resize", e => {
      page.w = window.innerWidth;
      page.h = window.innerHeight;

      snowBackground.width = page.w;
      snowBackground.height = page.h;

      const max = Math.floor(page.w * page.h / 5000);

      if(particle.length > max) {
        particle.splice(particle.length - (particle.length - max), particle.length - max);
      }else if(particle.length < max) {
        for(let i = 0; i < max - particle.length; i++) {
          const result = {};
          
          result.size = Math.random() * 3 + 2;
          result.x = Math.random() * (page.w + (result.size * 2));
          result.y = Math.random() * (page.h + (result.size * 2));
          result.step = Math.random() * pi * 2;
          result.alpha = Math.random() * 0.5 + 0.2;
    
          particle.push(result);
        }
      }
    })

    for(let i = 0; i < Math.floor(page.w * page.h / 5000); i++) {
      const result = {};
      
      result.size = Math.random() * 3 + 2;
      result.x = Math.random() * (page.w + (result.size * 2));
      result.y = Math.random() * (page.h + (result.size * 2));
      result.step = Math.random() * pi * 2;
      result.alpha = Math.random() * 0.5 + 0.2;

      particle.push(result);
    }

    const snowAnimation = e => {
      sCtx.clearRect(0, 0, page.w, page.h);
      
      const now = new Date().getTime();
      const msDefault = now - prevMs;
      let ms = msDefault;
      prevMs = now;

      // if(averageMs == 0) 

      if(ms > averageMs) {
        if(averageMs * 1.5 >= ms) {
          averageMs = ms;
        }else {
          if(prevAverageMs * 1.5 >= ms) {
            averageMs = ms;
          }else {
            ms = Math.floor(averageMs);
            averageMs = ms;
          }
        }
      }else {
        averageMs += ms;
        averageMs = averageMs / 2;
      }
      prevAverageMs = msDefault;

      sCtx.globalAlpha = 1;

      if(imgLoad === 2) {
        if(page.w > page.h) {
          sCtx.drawImage(tree, page.w - 300, page.h - 280, 280, 280);
        }else {
          sCtx.drawImage(tree, page.w - 250, page.h - 280, 280, 280);
        }
        
        if(page.w < snow.width) {
          sCtx.drawImage(snow, page.w - snow.width, page.h - snow.height);
        }else {
          for(let i = 0; i < page.w / snow.width; i++) {
            sCtx.drawImage(snow, page.w - snow.width - (snow.width * i), page.h - snow.height);
            console.log("test");
          }
        }
      }

      sCtx.fillStyle = "#fff";

      for(let i = 0; i < particle.length; i++) {
        const item = particle[i];

        sCtx.globalAlpha = item.alpha;

        sCtx.beginPath();
        sCtx.arc(item.x + (Math.cos(item.step) * item.size), item.y, item.size, 0, pi * 2);
        sCtx.fill();
        sCtx.beginPath();

        item.y += ((10 - item.size) / 4) / 16 * ms;
        item.step += ((7 - item.size) / 200) / 16 * ms;

        if(item.y + item.size > page.h) {
          item.size = Math.random() * 3 + 2;
          item.x = Math.random() * (page.w + (item.size * 2));
          item.y = - item.size;
          item.step = Math.random() * pi * 2;
          item.alpha = Math.random() * 0.5 + 0.2;
        }
      }

      requestAnimationFrame(snowAnimation);
    }

    snowAnimation();

    body.append(snowBackground);
  }
}

init();