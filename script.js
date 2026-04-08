const section = document.getElementById('cards-section')

const api = 'https://hp-api.onrender.com/api/characters'

let allCharacters = []

section.innerHTML = "Loading..."

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

  const searchText = document.getElementById('search-input').value.toLowerCase()
  const selectedHouse = document.getElementById('house-filter').value
  const sortOrder = document.getElementById('sort-order').value

  let result = allCharacters.filter(character => {
    return character.name.toLowerCase().includes(searchText)
  })

  if (selectedHouse !== '') {
    result = result.filter(character => {
      return character.house === selectedHouse
    })
  }

  if (sortOrder === 'az') {
    result.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  } else if (sortOrder === 'za') {
    result.sort((a, b) => {
      if (a.name < b.name) return 1
      if (a.name > b.name) return -1
      return 0
    })
  }

  section.innerHTML = ''

  result.forEach(character => {

    const card = document.createElement('div')
    card.className = 'character-card'

    if (character.image) {
      const photo = document.createElement('img')
      photo.src = character.image
      photo.alt = character.name
      card.appendChild(photo)
    }

    const name = document.createElement('h3')
    name.innerText = character.name

    const house = document.createElement('p')
    house.innerText = character.house || 'No house'

    const species = document.createElement('p')
    species.innerText = character.species

    card.appendChild(name)
    card.appendChild(house)
    card.appendChild(species)

    section.appendChild(card)

  })

}

document.getElementById('search-input').addEventListener('input', renderCards)
document.getElementById('house-filter').addEventListener('change', renderCards)
document.getElementById('sort-order').addEventListener('change', renderCards)