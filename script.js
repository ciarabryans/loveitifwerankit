// List of songs
const songs = [
  "The 1975",
  "Give Yourself a Try",
  "TOOTIMETOOTIMETOOTIME",
  "Love It If We Made It",
  "Be My Mistake",
  "Sincerity Is Scary",
  "I Like America & America Likes Me",
  "The Man Who Married a Robot",
  "Inside Your Mind",
  "It's Not Living (If It's Not With You)",
  "Surrounded By Heads and Bodies",
  "Mine",
  "I Couldn't Be More in Love",
  "I Always Wanna Die (Sometimes)"
];

const songList = document.getElementById("song-list");

// Add songs dynamically to the list with static marker for Top 5
function renderSongs() {
  songList.innerHTML = ''; // Clear the list

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

// Initialize Sortable.js for drag-and-drop functionality
new Sortable(songList, {
  animation: 150, // Smooth animation during drag-and-drop
  onEnd: () => updateRanks() // Update ranks and re-insert static markers after reorder
});

// Update ranks and re-insert static marker after reordering
function updateRanks() {
  const items = Array.from(songList.querySelectorAll("li"));
  items.forEach((li, index) => {
    li.querySelector('.rank').textContent = `${index + 1}.`;
  });

  // Remove existing markers and re-add
  document.querySelectorAll(".marker").forEach(marker => marker.remove());

  // Add static Top 5 marker
  if (items[5]) {
    const top5Marker = document.createElement("div");
    top5Marker.classList.add("marker");
    top5Marker.textContent = "TOP 5";
    songList.insertBefore(top5Marker, items[5]);
  }
}

// Initial render of the songs
renderSongs();

// Function to create a tweet with the current ranking
document.getElementById("tweet-results").addEventListener("click", () => {
  const items = Array.from(songList.children).filter((child) => child.tagName === "LI");
  const ranking = items.map((li) => li.textContent.trim()).join(" "); // Combine song titles with ranks already shown

  // Construct the tweet text
  const baseText = `My ABIIOR ranking: `;
  const hashtag = " #The1975";
  const maxTweetLength = 280;

  // Calculate available space for the ranking
  const availableSpace = maxTweetLength - (baseText.length + hashtag.length);

  // Truncate the ranking if necessary
  let tweetRanking = ranking;
  if (ranking.length > availableSpace) {
    tweetRanking = ranking.slice(0, availableSpace - 3) + "..."; // Leave space for ellipsis
  }

  const tweetText = baseText + tweetRanking + hashtag;

  // Construct the Twitter share URL
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  // Open the Twitter share URL
  window.open(tweetUrl, "_blank"); // Open Twitter's compose page
});
