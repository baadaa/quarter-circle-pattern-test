let browserWidth, browserHeight, gap, w, borderRads, interval;

const pink = "#F5333F",
  lightBlue = "#39B3CA",
  blue = "#2B7499",
  lightGray = "#DDDDDD",
  darkGray = "#333333";

let isDark = false;
let colors = [pink, lightBlue, blue, lightBlue, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray];

const container = document.querySelector('.container');

let items = [...container.querySelectorAll('.item')];


const morph = function() {
  items.forEach(item => {
    const radius = borderRads[Math.floor(Math.random() * borderRads.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    item.style.borderRadius = radius;
    item.style.backgroundColor = color;
  })
}

const calcDimensions = () => {
  browserWidth = window.innerWidth;
  browserHeight = window.innerHeight;
  gap = browserWidth / 20 / 15;
  w = browserWidth / 20 - gap;
  borderRads = [`${w}px 0 0 0`, `0 ${w}px 0 0`, `0 0 ${w}px 0`, `0 0 0 ${w}px`, `${w}px 0 0 0`, `0 ${w}px 0 0`, `0 0 ${w}px 0`, `0 0 0 ${w}px`, `${w}px`];
}

const drawBoxes = () => {
  calcDimensions();
  const cols = 20;
  const rows = Math.round(browserHeight / browserWidth * 20);
  console.log(cols, rows);
  let str="";

  for (let i = 0; i < cols * rows ; i++ ) {
    str += '<div class="item"></div>';
  }
  container.innerHTML = str;
  items = [...container.querySelectorAll('.item')];
}
const scale = () => {
  calcDimensions();
  items.forEach(item => {
    item.style.width = w + "px";
    item.style.height = w + "px";
    item.style.marginRight = gap + "px";
    item.style.marginBottom = gap + "px";
  })
}

const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(morph, 3000);

}
const shiftColor = () => {
  isDark = !isDark;

  if (isDark) {
    document.body.style.backgroundColor = "#000";
    colors = [pink, lightBlue, blue, lightBlue, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray, darkGray];
    morph();
    resetInterval();
  } else {
    document.body.style.backgroundColor = "#FFF";
    colors = [pink, lightBlue, blue, lightBlue, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray, lightGray];
    morph();
    resetInterval();
  }
}

window.onload = () => {
  drawBoxes();
  scale();
  interval = setInterval(morph, 3000);

  (function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

// handle event
  window.addEventListener("optimizedResize", () => {
    drawBoxes();
    scale();
    morph();
  });
  document.addEventListener("click", shiftColor);
}