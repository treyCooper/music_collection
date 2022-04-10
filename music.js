const readline = require('readline')
const rl = readline.createInterface({input: process.stdin, output: process.stdout})

const MusicCollectionController = require('./MusicCollectionController')
const musicCollectionController = new MusicCollectionController()

rl.write(`\n${musicCollectionController.greet()}\n`)
rl.prompt()
rl.on('line', function(userInput) {
  if (userInput) {
    userInput = userInput.trim()
  }
  if (userInput && userInput.toLowerCase() === 'quit') {
    rl.close()
  } else {
    rl.setPrompt(`${musicCollectionController.handleInput(userInput)}\n> `)
    rl.prompt()
  }
})
rl.on('close', () => {
  console.log('Bye!\n')
  process.exit(0)
});

