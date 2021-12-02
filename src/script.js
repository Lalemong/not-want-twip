function init() {
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
  let date = new Date();
  
  function gameStart() {
    const btns = $pad.querySelectorAll(".btn");
    btns.forEach(el => el.remove());
    $pass.value = "";
    sheet = "";
    
    number.sort(function() {
      return Math.random() - 0.5
    });
    answer = number.join("");
    $ex.innerText = answer;
  
    number.sort(function() {
      return Math.random() - 0.5
    });
    for(let i = 0; i < 10; i++) {
      const btn = document.createElement("button");
      btn.classList.add("btn");
      btn.innerText = number[i];
  
      btn.addEventListener("click", function() {
        if(btn.classList.contains("use")) return e.preventDefault();
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
  
  $no.addEventListener("click", function() {
    window.close();
  })
  
  $yes.addEventListener("click", function() {
    $popup.classList.remove("none");
  
    gameStart();
  })
  
  $pass.addEventListener("keydown", function(e) {
    e.preventDefault();
    $pass.value = sheet;

    if(e.key.length === 1)skip += e.key.replace(/[^a-z|A-Z]/g, "");
    if(skip === "Slime") location.replace("https://twip.kr/l_l_mong1122");
    if(e.key === "Backspace") skip = skip.slice(0, skip.length - 1);
  })
  
  $pass.addEventListener("keypress", function(e) {
    e.preventDefault();
    $pass.value = sheet;

    if(e.key.length === 1)skip += e.key.replace(/[^a-z|A-Z]/g, "");
    if(skip === "Slime") location.replace("https://twip.kr/l_l_mong1122");
    if(e.key === "Backspace") skip = skip.slice(0, skip.length - 1);

    $ex.innerText = sheet;
  })
  
  $pass.addEventListener("input", function(e) {
    e.preventDefault();
    $pass.value = sheet;
  })
  
  $pass.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    $pass.value = sheet;
  })
  
  $popup.addEventListener("mousedown", function(e) {
    if(e.target === $popup) {
      closePopup = true;
    }
  });
  
  $popup.addEventListener("mouseup", function(e) {
    if(e.target === $popup && closePopup) {
      $popup.classList.add("none");
      $reset.classList.add("none");
      $game.style.pointerEvents = "";
    }
    closePopup = false;
  });
  
  $retry.addEventListener("click", function() {
    $reset.classList.add("none");
    $game.style.pointerEvents = "";
  
    gameStart();
  })

  if(date.getMonth() === 11 || date.getMonth() === 0) {
    const body = document.querySelector("body");
    const page = {w: window.innerWidth, h: window.innerHeight};
    const particle = [];
    const snow = new Image;
    const tree = new Image;
    const pi = Math.PI;
    let time = new Date().getTime();
    let imgLoad = 0;

    const snowBackground = document.createElement("canvas");
    const sCtx = snowBackground.getContext("2d");
    snowBackground.classList.add("snow-background");
    
    snowBackground.width = page.w;
    snowBackground.height = page.h;

    snow.src = "src/snow/snow.png";
    tree.src = "src/snow/tree.png";

    snow.onload = function() {
      imgLoad++;
    }
    tree.onload = function() {
      imgLoad++;
      tree.width = 140;
    }
    
    window.addEventListener("resize", function() {
      page.w = window.innerWidth;
      page.h = window.innerHeight;

      snowBackground.width = page.w;
      snowBackground.height = page.h;
    })

    for(let i = 0; i < 300; i++) {
      const result = {};
      
      result.size = Math.random() * 3 + 2;
      result.x = Math.random() * (page.w + (result.size * 2));
      result.y = Math.random() * (page.h + (result.size * 2));
      result.step = Math.random() * pi * 2;
      result.alpha = Math.random() * 0.5 + 0.2;

      particle.push(result);
    }

    function snowAnimation() {
      sCtx.clearRect(0, 0, page.w, page.h);
      
      const now = new Date().getTime();
      const ms = now - time;
      time = now;

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

        item.y += (10 - item.size) / 4;
        item.step += (7 - item.size) / 200;

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