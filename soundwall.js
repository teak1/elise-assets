//version 0.0.2
function soundwall(o, mount) {
  var isMobile = false; //initiate as false
  // device detection
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }
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
  .soundwall-container:hover .soundwall-middle {opacity: 1;}
  .soundwall-open-mob{position: absolute;
    width: 100%;
    padding-top: 1em;
    padding-bottom: 0.1em;
    background-color:rgba(200,200,200,0.9);text-align:center;height:2em;}
  </style>
  <div class="soundwall-container" id="${openId}">
  
  ${isMobile ? "<div class=\"soundwall-open-mob\"><b>Touch to open soundwall</b></div>" : ""}
  <img src="${images.display}" alt="Avatar" class="soundwall-image" width="300">
  ${isMobile ? "" : `
  <div class="soundwall-middle">
    <a>
    <div class="soundwall-text">Click to open soundwall</div>
    </a>
  </div>
  `}
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
      .soundwall-overlay-image-horizontal{
        width:calc(100vw - 100px);
      }
      .soundwall-overlay-image-vertical{
        height:calc(100vh - 100px);
      }
    </style>
    <div class="soundwall-overlay-container">
    <div class="soundwall-overlay-middle">
    <div id="${wrapperId}">
    <img class="soundwall-overlay-image-horizontal" id="${imgId}"/>
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
      window.requestAnimationFrame(() => { updateImageSize() });
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
      let pixel = format(ctx.getImageData(x, y, 1, 1).data);
      console.log(x, y);
      if (lookup[pixel]) lookup[pixel].play();
    })
  }
  function updateImageSize() {
    let orientation;
    let boundingrect = img.getClientRects()[0];
    if (!boundingrect) return;
    let current = img.getAttribute("class");
    // if (window.innerWidth < window.innerHeight) {
    //   if (img.width > img.height) {
    //     orientation = "horizontal"
    //   } else {
    //     orientation = "vertical"
    //   }
    // } else {
    //   if (img.width > img.height && img.getClientRects()[0] && img.getClientRects()[0].height <= window.innerHeight - 100) {
    //     orientation = "horizontal"
    //   } else {
    //     orientation = "vertical"
    //   }
    // }
    if (current === "soundwall-overlay-image-horizontal") {
      if (boundingrect.height > window.innerHeight - 100) {
        orientation = "vertical";
        img.setAttribute("class", "soundwall-overlay-image-" + orientation);
      }
    } else if (current === "soundwall-overlay-image-vertical") {
      if (boundingrect.width > window.innerWidth - 100) {
        orientation = "horizontal";
        img.setAttribute("class", "soundwall-overlay-image-" + orientation);
      }
    }
  }
  img.addEventListener("load", updateImageSize);
  window.addEventListener("resize", updateImageSize);
  img.addEventListener("load", loadHandler);
  img.src = images.display;
}