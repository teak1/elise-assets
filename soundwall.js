//version 0.0.2
function soundwall(o, mount) {
  function html(str) {
    return new DOMParser().parseFromString(str, "text/html").body.children[0];
  }
  const lookup = {};
  function generateId() {
    let c = "abcdefghijklmnopqrstuvwxyz";
    let id = Array(64).fill(0).map(_ => c[Math.floor(Math.random() * c.length)]).join("");
    if (document.getElementById(id)) return generateId();
    return id;
  }
  const { sounds, images } = o;
  const openId = generateId();
  const buttonId = generateId();
  const imgId = generateId();
  const wrapperId = generateId();
  let activated = false;
  mount.appendChild(html(`<div>
  <style>
  .soundwall-container {position: relative;width: 300px;background-color:rgba(200,200,200,0.6);}
  .soundwall-image {opacity: 1;display: block;width: 100%;height: auto;transition: .2s ease;backface-visibility: hidden;}
  .soundwall-middle {transition: .2s ease;opacity: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);text-align: center;}
  .soundwall-container:hover .soundwall-image {opacity: 0.3;}
  .soundwall-container:hover .soundwall-middle { opacity: 1;}
  </style>
  <div class="soundwall-container" id="${openId}">
  <img src="${images.display}" alt="Avatar" class="soundwall-image" width="300">
  <div class="soundwall-middle">
    <a>
    <div class="soundwall-text">Click to open</div>
    </a>
  </div>
  </div>
  </div>`));
  const overlay = html(`
  <div class="soundwall-display-wrapper" hidden>
    <style>
      .soundwall-display-wrapper{
        position:fixed;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        transition:0.5s;
        background-color:rgba(200,200,200,0.6);
        opacity:0;
        pointer-events:none;
        transition-propery:opacity;
        z-index:100;
      }
      .soundwall-display-wrapper.open{
        transition:0.5s;
        opacity:1;
        pointer-events:all;
        transition-propery:opacity;
      }
      .soundwall-display-close-button{
        position:fixed;
        padding:1em;
        top:20px;
        left:20px;
        border-radius:1em;
        background-color:white;
      }
      .soundwall-overlay-container {
        position: relative;
        width:100vw;
        height:100vh;
      }
      .soundwall-overlay-middle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
      }
      .soundwall-overlay-image{
        height:calc(100vh - 100px);
      }
    </style>
    <div class="soundwall-overlay-container">
    <div class="soundwall-overlay-middle">
    <div id="${wrapperId}">
    <img class="soundwall-overlay-image" id="${imgId}"/>
    </div>
  </div>
  </div>
  
  <button class="soundwall-display-close-button" id="${buttonId}">Close</button>
  </div>`);
  document.body.appendChild(overlay);
  const img = document.getElementById(imgId);

  const maskImg = document.createElement("img");
  const wrapper = document.getElementById(wrapperId);
  function handleCloseOverlay() {
    overlay.classList.remove("open");
    overlay.hidden = true;
    const keys = Object.keys(lookup);
    for (let i = 0; i < keys.length; i++) {
      lookup[keys[i]].pause(); lookup[keys[i]].currentTime = 0;
    }
  }
  document.getElementById(buttonId).addEventListener("click", handleCloseOverlay);
  document.getElementById(buttonId).addEventListener("touchstart", handleCloseOverlay);
  function handleOpen() {
    overlay.hidden = false;
    overlay.classList.add("open");
    if (!activated) {
      const keys = Object.keys(sounds);
      for (let i = 0; i < keys.length; i++) {
        lookup[keys[i]] = new Audio(sounds[keys[i]]);
      }
      activated = true;
      activate();
    }
  }
  document.getElementById(openId).addEventListener("click", handleOpen);
  document.getElementById(openId).addEventListener("touchstart", handleOpen);
  let loaded = 0;
  function loadHandler() {
    loaded++;
    if (loaded == 2) execute();
  }
  function activate() {

    maskImg.addEventListener("load", loadHandler);
    maskImg.src = images.mask;
  }
  function format([r, g, b, a]) {

    function digit(n) {
      return n.toString(16).padStart(2, "0");
    }
    return `#${digit(r)}${digit(g)}${digit(b)}${digit(a)}`;
  }
  function execute() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", maskImg.width);
    canvas.setAttribute("height", maskImg.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
    wrapper.addEventListener("click", (evt) => {
      let x = Math.floor(evt.offsetX / img.width * maskImg.width);
      let y = Math.floor(evt.offsetY / img.height * maskImg.height);
      let pixel = format(ctx.getImageData(evt.offsetX, evt.offsetY, 1, 1).data);
      console.log(x, y);
      if (lookup[pixel]) lookup[pixel].play();
    })
  }
  img.addEventListener("load", loadHandler);
  img.src = images.display;
}