const fs = require('fs');
const fetch = require('node-fetch')
const debug = require('debug')('app:get-data')

const apiURL = process.env.API_URL

function getUniquePlaces(data) {
  const places = data.reduce((accu, place) => {
    const descriptionFound = accu.find(item => item.description === place.description)

    if (!descriptionFound) {
      accu.push(place)
    } else {
      console.log(`description repited:${accu._id}:${place._id}`)
    }

    return accu
  }, [])

  return places
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
