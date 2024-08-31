const progress = document.getElementById("progress");
const song = document.getElementById("song");
const ctrlIcon = document.getElementById("play");
const volumeSlider = document.getElementById("volume");
const background = document.querySelector(".background img");

const tracks = [
  {
    src: "assets/music/song1.mp3",
    img: "assets/images/1.jpg",
    bgImg: "assets/images/1.jpg",
    name: "Blue Bird Naruto",
    artist: "Ikimono Gakari",
  },
  {
    src: "assets/music/song2.mp3",
    img: "assets/images/2.webp",
    bgImg: "assets/images/2.webp",
    name: "Solo Leveling Dark Aria",
    artist: "Sawano Hiroyuki",
  },
  {
    src: "assets/music/song3.mp3",
    img: "assets/images/3.webp",
    bgImg: "assets/images/3.webp",
    name: "Suzume no Tojimari",
    artist: "Radwimps",
  },
  {
    src: "assets/music/song4.mp3",
    img: "assets/images/4.jpg",
    bgImg: "assets/images/4.jpg",
    name: "Orochimaru Theme Song",
    artist: "Orochimaru",
  },
  {
    src: "assets/music/song5.mp3",
    img: "assets/images/5.png",
    bgImg: "assets/images/5.png",
    name: "Akstsuki Theme Song",
    artist: "Akatsuki",
  },
];

let currentTrackIndex = 0;

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
  document.getElementById("end-time").textContent = formatTime(song.duration);
};

song.ontimeupdate = function () {
  progress.value = song.currentTime;
  document.getElementById("start-time").textContent = formatTime(
    song.currentTime
  );
};

progress.oninput = function () {
  song.currentTime = progress.value;
};

volumeSlider.oninput = function () {
  song.volume = volumeSlider.value;
};

function playPause() {
  if (song.paused) {
    song.play();
    ctrlIcon.classList.replace("fa-play", "fa-pause");
  } else {
    song.pause();
    ctrlIcon.classList.replace("fa-pause", "fa-play");
  }
}

function prevTrack() {
  currentTrackIndex =
    currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
  loadTrack(currentTrackIndex);
}

function nextTrack() {
  currentTrackIndex =
    currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
  loadTrack(currentTrackIndex);
}

function loadTrack(index) {
  const track = tracks[index];
  song.src = track.src;
  document.querySelector(".song-img").src = track.img;
  document.querySelector("#song-name").textContent = track.name;
  document.querySelector("#artist-name").textContent = track.artist;
  background.src = track.bgImg;
  song.play();
  ctrlIcon.classList.replace("fa-play", "fa-pause");
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

song.addEventListener("ended", nextTrack);
