const { searchPairsMatchingQuery } = require('dexscreener-api')

async function main() {
  const searchResponse = await searchPairsMatchingQuery('WBTC')

  console.log(searchResponse)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
