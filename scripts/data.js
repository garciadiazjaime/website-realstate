const fs = require('fs');
const fetch = require('node-fetch')
const debug = require('debug')('app:get-data')

const apiURL = process.env.API_URL

function getUniquePlaces(data) {
  const places = data.reduce((accu, place) => {
    const placeFound = accu.find(item => item.description === place.description || item.title === place.title)

    if (!placeFound) {
      accu.push(place)
    } else {
      console.log(`description repited:${placeFound._id}:${place._id}`)
    }

    return accu
  }, [])

  return places.slice(0, 40)
}

async function getPlaces() {
  debug('getting places...')
  const response = await fetch(`${apiURL}/places`)
  const data = await response.json()

  const places = getUniquePlaces(data)

  fs.writeFileSync('./static/places.json', JSON.stringify(places));
}


async function main() {
  await getPlaces()
}

main().then(() => {
  debug('end')
})
