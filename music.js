#! /usr/bin/env node
const readline = require('readline')
const rl = readline.createInterface({input: process.stdin, output: process.stdout})

const MusicCollectionController = require('./MusicCollectionController')
const musicCollectionController = new MusicCollectionController()

rl.write(`\n${musicCollectionController.greet()}\n\n`)
rl.prompt()
rl.on('line', function(userInput) {
  if (userInput) {
    userInput = userInput.trim()
  }
  if (userInput && userInput.toLowerCase() === 'quit') {
    rl.close()
  } else {
    rl.setPrompt(`\n${musicCollectionController.handleInput(userInput)}\n\n> `)
    rl.prompt()
  }
})
rl.on('close', () => {
  console.log('\nBye!\n')
  process.exit(0)
});

