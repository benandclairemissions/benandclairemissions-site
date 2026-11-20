/* HOW TO READ THIS FILE: lines starting with // are notes to you. Change only what's inside "quotes". */

/* ===== SETTINGS YOU MAY EDIT ===== */
// Link used by the "Pray" row (your Google Sheet / newsletter form). Better: a Google Form link.
const SHEET_LINK = "https://docs.google.com/spreadsheets/d/14ItNuOf7vuEbxfXUww0uFOfKoTSLuIYi8PVc7IKnZ-o/edit?usp=sharing";
// Google Apps Script web-app URL that saves form entries to the sheet (see README). Leave "" until set up.
const SHEET_ENDPOINT = "";

document.getElementById("prayLink").href = SHEET_LINK;          // puts the link on the Pray row.
document.getElementById("year").textContent = new Date().getFullYear(); // fills in the footer year.

/* ===== VIDEO ===== */
const player   = new Vimeo.Player(document.getElementById("story")); // connects to the hidden Vimeo video.
const cover    = document.getElementById("cover");    // the thumbnail layer.
const storyBtn = document.getElementById("storyBtn"); // the "How we got here…" button.
const ctrlBtn  = document.getElementById("ctrlBtn");  // the pause/play button.

function setCtrl(playing) {                          // switches the button between Pause and Play.
  ctrlBtn.textContent = playing ? "Pause" : "Play";  // CHANGE the words "Pause" / "Play" if you like.
  ctrlBtn.setAttribute("aria-label", playing ? "Pause video" : "Play video");
}

storyBtn.addEventListener("click", async () => {     // runs when the main button is clicked.
  cover.classList.add("hidden");                     // fades the thumbnail + button out.
  ctrlBtn.classList.add("show");                     // fades the pause/play button in.
  await player.setMuted(false);                      // sound on (allowed because they clicked).
  await player.setVolume(1);                         // full volume (0 to 1).
  await player.play();                               // start the video.
  setCtrl(true);
});

ctrlBtn.addEventListener("click", async () => {      // runs when pause/play is clicked.
  if (await player.getPaused()) { await player.play(); setCtrl(true); }   // paused? play it.
  else { await player.pause(); setCtrl(false); }                          // playing? pause it.
});

player.on("ended", async () => {                     // when the video finishes...
  await player.setCurrentTime(0);                    // jump back to the start (hides Vimeo's end screen),
  await player.pause();                              // stay paused,
  setCtrl(false);                                    // and show "Play".
});

/* ===== TESTIMONIES: expand / collapse ===== */
document.querySelectorAll(".story-toggle").forEach(btn => {   // for every photo button...
  btn.addEventListener("click", () => {                       // when clicked...
    const story = btn.closest(".story"), open = story.classList.toggle("open"); // open or close it.
    btn.setAttribute("aria-expanded", String(open));
  });
});

/* ===== CONNECT FORM ===== */
const form = document.getElementById("connectForm"), note = document.getElementById("formNote");
form.addEventListener("submit", async e => {          // when "Send" is clicked...
  e.preventDefault();                                 // stop the page from reloading.
  const data = new FormData(form);                    // grab what they typed.
  if (!data.get("email") && !data.get("phone")) { note.textContent = "Add an email or phone number so we can reach you."; return; } // CHANGE message.
  if (!SHEET_ENDPOINT) { note.textContent = "Form isn’t connected yet. See README step 4."; return; }
  try {
    await fetch(SHEET_ENDPOINT, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) }); // sends to your sheet.
    form.reset(); note.textContent = "Thank you. We’ll be in touch soon."; // CHANGE message.
  } catch { note.textContent = "Something went wrong. Please try again."; } // CHANGE message.
});
