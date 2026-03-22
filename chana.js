/* =====================
   IMAGE TRACK DRAG
   ===================== */
   const track = document.getElementById('image-track');
   if (track) {
     track.dataset.mouseDownAt = "0";
     track.dataset.prevPercentage = "0";
   
     window.onmousedown = e => {
       track.dataset.mouseDownAt = e.clientX;
     };
   
     window.onmouseup = () => {
       track.dataset.mouseDownAt = "0";
       track.dataset.prevPercentage = track.dataset.percentage || "0";
     };
   
     window.onmousemove = e => {
       if (track.dataset.mouseDownAt === "0") return;
       const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
       const maxDelta = window.innerWidth / 2;
       const percentage = (mouseDelta / maxDelta) * -100;
       const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
       track.dataset.percentage = nextPercentage;
       track.style.transform = `translate(${nextPercentage}%, 0%)`;
     };
   }
   
   /* =====================
      RESUME BUTTONS
      ===================== */
   const button1 = document.getElementById("resume1-button");
   if (button1) {
     button1.addEventListener("click", function () {
       document.getElementById("resume-viewer").setAttribute("data", "resume.pdf");
     });
   }
   
   const button2 = document.getElementById("resume2-button");
   if (button2) {
     button2.addEventListener("click", function () {
       document.getElementById("resume-viewer").setAttribute("data", "resumeReg.pdf");
     });
   }
   
   /* =====================
      DROPDOWNS
      ===================== */
   const dropdowns = document.querySelectorAll(".dropdown");
   dropdowns.forEach(btn => {
     btn.addEventListener("click", () => {
       btn.classList.toggle("active");
       const content = btn.nextElementSibling;
       if (content.style.maxHeight) {
         content.style.maxHeight = null;
       } else {
         content.style.maxHeight = content.scrollHeight + "px";
       }
     });
   });
   
   /* =====================
      COLOR HELPERS
      ===================== */
   function hexToRgb(hex) {
     return {
       r: parseInt(hex.slice(1, 3), 16),
       g: parseInt(hex.slice(3, 5), 16),
       b: parseInt(hex.slice(5, 7), 16)
     };
   }
   
   function lerpColor(a, b, t) {
     const ca = hexToRgb(a);
     const cb = hexToRgb(b);
     const r  = Math.round(ca.r + t * (cb.r - ca.r));
     const g  = Math.round(ca.g + t * (cb.g - ca.g));
     const bl = Math.round(ca.b + t * (cb.b - ca.b));
     return `rgb(${r},${g},${bl})`;
   }
   
   /* =====================
      SKILLS SETUP
      ===================== */
   const skillsSection = document.querySelector('.skills-section');
   const bgColors   = ['#dceeff', '#a8c8f0', '#7aaee0', '#4d8fd0', '#2070c0'];
   const cardColors = ['#f0f7ff', '#d6eaff', '#b8d8ff', '#96c3ff', '#70aaff'];
   
   /* =====================
      TYPEWRITER EFFECT
      ===================== */
   function typeItem(li, text, speed, callback) {
     li.textContent = '';
     li.style.visibility = 'visible';
     let i = 0;
     const cursor = document.createElement('span');
     cursor.classList.add('type-cursor');
     cursor.textContent = '|';
     li.appendChild(cursor);
   
     const interval = setInterval(() => {
       cursor.before(text[i]);
       i++;
       if (i >= text.length) {
         clearInterval(interval);
         cursor.remove();
         if (callback) callback();
       }
     }, speed);
   }
   
   function animateCardItems(card) {
     const items = card.querySelectorAll('ul li');
     let index = 0;
   
     function next() {
       if (index >= items.length) return;
       const li = items[index];
       const text = li.dataset.text || li.textContent.trim();
       li.dataset.text = text;
       index++;
       typeItem(li, text, 40, () => setTimeout(next, 80));
     }
   
     next();
   }
   
   const animatedCards = new Set();
   
   function checkSkillCards() {
     document.querySelectorAll('.skill-card').forEach(card => {
       if (animatedCards.has(card)) return;
       const rect = card.getBoundingClientRect();
       if (rect.top < window.innerHeight - 60) {
         animatedCards.add(card);
         card.classList.add('active');
   
         card.querySelectorAll('ul li').forEach(li => {
           li.dataset.text = li.textContent.trim();
           li.textContent = '';
           li.style.visibility = 'hidden';
         });
   
         setTimeout(() => animateCardItems(card), 300);
       }
     });
   }
   
   /* =====================
      DOTS — scroll-driven
      ===================== */
   /* =====================
   DIAMOND DOTS
   ===================== */
const dotsRow  = document.querySelector('.skills-dots');
const DIAMONDS = 20; // how many diamonds across
const allDots  = [];

if (dotsRow) {
  for (let d = 0; d < DIAMONDS; d++) {
    const diamond = document.createElement('div');
    diamond.classList.add('mini-diamond');
    diamond.style.gridColumn = d + 1;

    for (let cell = 0; cell < 9; cell++) {
      if ([1, 3, 5, 7].includes(cell)) {
        const dot = document.createElement('span');
        dot.classList.add('sdot');
        diamond.appendChild(dot);
        allDots.push({ dot, diamond: d });
      } else {
        const empty = document.createElement('span');
        empty.classList.add('sdot-empty');
        diamond.appendChild(empty);
      }
    }

    dotsRow.appendChild(diamond);
  }
}

function updateDots() {
  if (!dotsRow || allDots.length === 0) return;

  const rect         = dotsRow.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const progress     = Math.max(0, Math.min(1, 1 - rect.bottom / windowHeight));

  const visibleDiamonds = progress * DIAMONDS;

  allDots.forEach(({ dot, diamond }) => {
    // diamond 0 is leftmost, reveals first
    if (diamond < visibleDiamonds) {
      dot.classList.add('pop');
    } else {
      dot.classList.remove('pop');
    }
  });
}
   /* =====================
      TIMELINE REVEAL
      ===================== */
   const timelineItems = document.querySelectorAll(".timeline-content");
   
   function checkTimeline() {
     timelineItems.forEach(item => {
       const top = item.getBoundingClientRect().top;
       if (top < window.innerHeight - 100) {
         item.classList.add("show");
       }
     });
   }
   
   /* =====================
      MAIN SCROLL LISTENER
      ===================== */
   window.addEventListener('scroll', () => {
   
     // Skills section background + card color shift
     if (skillsSection) {
       const rect          = skillsSection.getBoundingClientRect();
       const sectionHeight = skillsSection.offsetHeight;
       const scrolled      = -rect.top;
       const progress      = Math.max(0, Math.min(1, scrolled / sectionHeight));
       const scaled        = progress * (bgColors.length - 1);
       const index         = Math.min(Math.floor(scaled), bgColors.length - 2);
       const t             = scaled - index;
   
       skillsSection.style.backgroundColor = lerpColor(bgColors[index], bgColors[index + 1], t);
   
       const newCardBg = lerpColor(cardColors[index], cardColors[index + 1], t);
       document.querySelectorAll('.skill-card').forEach(card => {
         card.style.backgroundColor = newCardBg;
       });
     }
   
     checkSkillCards();
     updateDots();
     checkTimeline();
   });
   
   // Run on load in case elements are already in view
   checkSkillCards();
   updateDots();
   checkTimeline();
   
   /* =====================
      LUNA CAROUSEL
      ===================== */
   const lunaTrack = document.querySelector('.Luna-track');
   if (lunaTrack) {
     const lunaCards     = document.querySelectorAll('.Luna-card');
     const descs         = document.querySelectorAll('.Luna-desc');
     const dotsContainer = document.querySelector('.Luna-dots');
     let current         = 0;
   
     lunaCards.forEach((_, i) => {
       const dot = document.createElement('div');
       dot.classList.add('Luna-dot');
       if (i === 0) dot.classList.add('active');
       dot.addEventListener('click', () => goTo(i));
       dotsContainer.appendChild(dot);
     });
   
     function goTo(index) {
       descs[current].classList.remove('active');
       document.querySelectorAll('.Luna-dot')[current].classList.remove('active');
       current = (index + lunaCards.length) % lunaCards.length;
       lunaTrack.style.transform = `translateX(-${current * 100}%)`;
       descs[current].classList.add('active');
       document.querySelectorAll('.Luna-dot')[current].classList.add('active');
     }
   
     document.querySelector('.Luna-prev').addEventListener('click', () => goTo(current - 1));
     document.querySelector('.Luna-next').addEventListener('click', () => goTo(current + 1));
   
     let startX = 0;
     lunaTrack.addEventListener('touchstart', e => startX = e.touches[0].clientX);
     lunaTrack.addEventListener('touchend', e => {
       const diff = startX - e.changedTouches[0].clientX;
       if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
     });
   }

   function showSection(section) {
    document.getElementById('play').style.display = 'none';
    document.getElementById('demo').style.display = 'none';
  
    document.getElementById(section).style.display = 'block';
  }

  const pacmanSection = document.querySelector('.Pacman-section');

if (pacmanSection) {
  for (let i = 0; i < 50; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');

    // random horizontal position
    pixel.style.left = Math.random() * 100 + '%';

    // random animation duration
    const duration = 4 + Math.random() * 6;
    pixel.style.animationDuration = duration + 's';

    // random delay so they don't all move together
    pixel.style.animationDelay = Math.random() * 5 + 's';

    // random opacity
    pixel.style.opacity = Math.random() * 0.5 + 0.2;

    pacmanSection.appendChild(pixel);
  }
}