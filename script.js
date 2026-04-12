const section = document.getElementById('cards-section')

const api = 'https://hp-api.onrender.com/api/characters'

let allCharacters = []

section.innerHTML = "Loading..."

// fetching api data
fetch(api)
  .then(res => res.json())
  .then(data => {

    allCharacters = data

    renderCards()

  })
  .catch(() => {
  section.innerHTML = "Failed to load data"
  })

function renderCards() {

  const typedName = document.getElementById('name-search').value.toLowerCase()
  const selectedHouse = document.getElementById('house-filter').value
  const sortOrder = document.getElementById('sort-order').value

  // filter by name
  let matches = allCharacters.filter(character => {
    return character.name.toLowerCase().includes(typedName)
  })

  // filter by house
  if (selectedHouse !== '') {
    matches = matches.filter(character => {
      return character.house === selectedHouse
    })
  }

  // sorting alphabetically
  if (sortOrder === 'az') {
    matches.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  } else if (sortOrder === 'za') {
    matches.sort((a, b) => {
      if (a.name < b.name) return 1
      if (a.name > b.name) return -1
      return 0
    })
  }

  // clearing previous matchess
  section.innerHTML = ''

  // shows count of matching characters
  const count = document.getElementById('match-count')
  count.innerText = 'Showing ' + matches.length + ' characters'

  // message if no characters match
  if (matches.length === 0) {
  section.innerHTML = '<p>No characters found.</p>'
  }

  matches.map(character => {

    // creating card
    const card = document.createElement('div')
    card.className = 'character-card'

    // image
    if (character.image) {
      const photo = document.createElement('img')
      photo.src = character.image
      photo.alt = character.name
      card.appendChild(photo)
    }

    // name
    const name = document.createElement('h3')
    name.innerText = character.name

    // house
    const house = document.createElement('p')
    house.innerText = character.house || 'No house'

    // species
    const species = document.createElement('p')
    species.innerText = character.species

    // putting all in the card
    card.appendChild(name)
    card.appendChild(house)
    card.appendChild(species)

    // putting card in section
    section.appendChild(card)

  })

}

// re-renders cards after every input change
document.getElementById('name-search').addEventListener('input', renderCards)
document.getElementById('house-filter').addEventListener('change', renderCards)
document.getElementById('sort-order').addEventListener('change', renderCards)