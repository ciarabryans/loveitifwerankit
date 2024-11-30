// List of songs
const songs = [
  "The 1975",
  "Give Yourself a Try",
  "TOOTIMETOOTIMETOOTIME",
  "How To Draw/Petrichor",
  "Love It If We Made It",
  "Be My Mistake",
  "Sincerity Is Scary",
  "I Like America & America Likes Me",
  "The Man Who Married a Robot/Love Theme",
  "Inside Your Mind",
  "It's Not Living (If It's Not With You)",
  "Surrounded By Heads and Bodies",
  "Mine",
  "I Couldn't Be More in Love",
  "I Always Wanna Die (Sometimes)"
];

const songList = document.getElementById("song-list");

function renderSongs() {
  songList.innerHTML = '';
  songs.forEach((song, index) => {
    if (index === 5) {
      const top5Marker = document.createElement("div");
      top5Marker.classList.add("marker");
      top5Marker.textContent = "TOP 5";
      songList.appendChild(top5Marker);
    }
    const li = document.createElement("li");
    li.innerHTML = `<span class="rank">${index + 1}.</span> ${song}`;
    songList.appendChild(li);
  });
}

new Sortable(songList, {
  animation: 150,
  onEnd: () => updateRanks()
});

function updateRanks() {
  const items = Array.from(songList.querySelectorAll("li"));
  items.forEach((li, index) => {
    li.querySelector('.rank').textContent = `${index + 1}.`;
  });
  document.querySelectorAll(".marker").forEach(marker => marker.remove());
  if (items[5]) {
    const top5Marker = document.createElement("div");
    top5Marker.classList.add("marker");
    top5Marker.textContent = "TOP 5";
    songList.insertBefore(top5Marker, items[5]);
  }
}

renderSongs();

document.getElementById("tweet-results").addEventListener("click", () => {
  const items = Array.from(songList.querySelectorAll("li")).slice(0, 5);
  const top5Ranking = items.map((li) => li.textContent.trim()).join(" | ");
  const tweetText = `My Top 5 ABIIOR songs: ${top5Ranking} \nRank your favorites: https://www.loveitifyourankit.com/`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(tweetUrl, "_blank");
});

function tweetTop5(event) {
  event.preventDefault();
  const items = Array.from(songList.querySelectorAll("li")).slice(0, 5);
  const top5Ranking = items.map((li) => li.textContent.trim()).join(" | ");
  const tweetText = `My Top 5 ABIIOR songs: ${top5Ranking} \nRank your favorites: https://www.loveitifyourankit.com/`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(tweetUrl, "_blank");
}
