const section = document.getElementById('cards-section')

const api = 'https://hp-api.onrender.com/api/characters'

fetch(api)
  .then(res => res.json())
  .then(data => {

    data.forEach(character => {

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

  })
