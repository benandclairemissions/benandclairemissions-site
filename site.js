/* Behind-the-scenes code. You do not need to edit this. */
(function () {
  var s = SETTINGS;
  var links = document.querySelectorAll("[data-link]");
  for (var i = 0; i < links.length; i++) {
    var u = s[links[i].getAttribute("data-link")];
    if (u) { links[i].href = u; if (u.indexOf("http") === 0) { links[i].target = "_blank"; links[i].rel = "noopener"; } }
  }
  document.getElementById("mail").href = "mailto:" + s.email;
  if (s.videoId) {
    document.getElementById("video").innerHTML =
      '<iframe src="https://www.youtube-nocookie.com/embed/' + s.videoId +
      '?autoplay=1&mute=1&playsinline=1&rel=0" title="Our story" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
  }
})();
