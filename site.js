/* Behind-the-scenes code. You do not need to edit this file. */
(function () {
  var s = SETTINGS;
  document.getElementById("giveBtn").href = s.giveUrl;
  document.getElementById("topGive").href = "#partner";
  document.getElementById("mail").href = "mailto:" + s.email;

  var gf = document.getElementById("giveFrame");
  if (s.giveEmbedUrl) {
    gf.innerHTML = '<iframe src="' + s.giveEmbedUrl + '" title="Become a partner" height="' +
      (s.giveHeight || 720) + '" loading="lazy"></iframe>';
  } else {
    gf.style.display = "none";
  }

  if (s.videoId) {
    document.getElementById("video").innerHTML =
      '<iframe src="https://www.youtube-nocookie.com/embed/' + s.videoId +
      '" title="Our story" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>';
  }

  var img = new Image();
  img.onload = function () {
    var p = document.getElementById("photo");
    p.innerHTML = ""; img.alt = "Ben and Claire"; p.appendChild(img);
  };
  img.src = s.photo;

  var m = document.getElementById("meter");
  for (var i = 0; i < s.goal; i++) {
    var b = document.createElement("span");
    var h = 28 + Math.abs(Math.sin(i * 0.5) * 42 + Math.sin(i * 1.7) * 26);
    b.style.height = Math.min(h, 100) + "%";
    if (i < s.partnersNow) { b.className = "on"; b.style.animationDelay = (i * 14) + "ms"; }
    m.appendChild(b);
  }
  m.setAttribute("aria-label", s.partnersNow + " of " + s.goal + " partners");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e, o) {
      if (e[0].isIntersecting) { m.classList.add("go"); o.disconnect(); }
    }, { threshold: 0.4 }).observe(m);
  } else { m.classList.add("go"); }
  document.getElementById("now").textContent = s.partnersNow;
  document.getElementById("left").textContent = Math.max(s.goal - s.partnersNow, 0);
})();
