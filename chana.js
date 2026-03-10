const track = document.getElementById('image-track');

window.onmousedown = e => {
    
    e.clientX;
}

window.onmousemove = e => {
   
    if(track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    
    track.style.transform = `translate(${nextPercentage}%, 0%)`;
}

const button1 = document.getElementById("resume1-button");
button1.addEventListener("click", function() {
    // Change the data attribute to the first resume
    alert("yes yes")
    console.log("Resume 1 button clicked!");
    document.getElementById("resume-viewer").setAttribute("data", "resume.pdf");
  });
  const button2 = document.getElementById("resume2-button");
  button2.addEventListener("click", function() {
    alert("yes ")
    console.log("Resume 2 button clicked!");
    // Change the data attribute to the second resume
    document.getElementById("resume-viewer").setAttribute("data", "resumeReg.pdf");
  });

  const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const content = btn.nextElementSibling;

    if(content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
const items = document.querySelectorAll(".timeline-content");

window.addEventListener("scroll", () => {

  items.forEach(item => {

    const top = item.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){
      item.classList.add("show");
    }

  });

});

 