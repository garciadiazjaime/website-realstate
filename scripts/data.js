const fs = require('fs');
const fetch = require('node-fetch')
const debug = require('debug')('app:get-data')

const apiURL = process.env.API_URL

async function getPlaces() {
  debug('getting posts by day...')
  const response = await fetch(`${apiURL}/places`)
  const postsByDay = await response.json()

  fs.writeFileSync('./static/places.json', JSON.stringify(postsByDay));
}


async function main() {
  await getPlaces()
}

main().then(() => {
  debug('end')
})
