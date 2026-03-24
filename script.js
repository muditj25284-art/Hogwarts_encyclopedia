// fetch("https://hp-api.onrender.com/api/characters")
//   .then(res => res.json())
//   .then(data => {
//     console.log("Total characters:", data.length);
//     console.log("First character:", data[0]);
//   });
//   .catch(err => console.error(err));

const API_URL = "https://hp-api.onrender.com/api/characters";

let allCharacters = [];

// --- FETCH ---
async function fetchCharacters() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allCharacters = data;
    document.getElementById("loading").style.display = "none";
    displayCharacters(allCharacters);
  } catch (err) {
    document.getElementById("loading").textContent = "Failed to load. Check your connection.";
    console.error(err);
  }
}

// --- DISPLAY ---
function displayCharacters(characters) {
  const container = document.getElementById("characters-container");
  document.getElementById("count").textContent = `Showing ${characters.length} characters`;

  if (characters.length === 0) {
    container.innerHTML = `<p style="color:#888; grid-column:1/-1">No characters found.</p>`;
    return;
  }

  container.innerHTML = characters.map(c => `
    <div class="card">
      ${c.image
        ? `<img src="${c.image}" alt="${c.name}" loading="lazy">`
        : `<div class="no-image">🧙</div>`
      }
      <div class="card-info">
        <h3>${c.name}</h3>
        <div class="species">${c.species || "Unknown species"}</div>
        <span class="house-badge house-${c.house || "none"}">
          ${c.house || "No house"}
        </span>
      </div>
    </div>
  `).join("");
}

// --- SEARCH (HOF: .filter) ---
function searchCharacters(list, query) {
  return list.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
}

// --- FILTER BY HOUSE (HOF: .filter) ---
function filterByHouse(list, house) {
  if (house === "all") return list;
  return list.filter(c => c.house === house);
}

// --- SORT (HOF: .sort) ---
function sortCharacters(list, order) {
  return [...list].sort((a, b) => {
    if (order === "asc")  return a.name.localeCompare(b.name);
    if (order === "desc") return b.name.localeCompare(a.name);
    return 0;
  });
}

// --- APPLY ALL ---
function applyFilters() {
  const query = document.getElementById("search-input").value;
  const house  = document.getElementById("house-filter").value;
  const order  = document.getElementById("sort-select").value;

  let results = filterByHouse(allCharacters, house);
  results = searchCharacters(results, query);
  results = sortCharacters(results, order);

  displayCharacters(results);
}

// --- EVENT LISTENERS ---
document.getElementById("search-input").addEventListener("input", applyFilters);
document.getElementById("house-filter").addEventListener("change", applyFilters);
document.getElementById("sort-select").addEventListener("change", applyFilters);

// --- INIT ---
fetchCharacters();