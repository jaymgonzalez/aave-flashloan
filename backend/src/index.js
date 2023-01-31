const { searchPairsMatchingQuery } = require('dexscreener-api')

async function main() {
  const searchResponse = await searchPairsMatchingQuery('WBNB')

  console.log(searchResponse)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
