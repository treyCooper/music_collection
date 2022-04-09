const readline = require('readline')
const rl = readline.createInterface({input: process.stdin, output: process.stdout})


class MusicCollection {
  constructor () {
    this.greeting = 'Welcome to your music collection!'
    this.collection = []
  }
}
const musicCollection = new MusicCollection()
rl.write(`\n${musicCollection.greeting}\n`)
rl.prompt()
rl.on('line', function(userInput) {
  if (userInput && userInput.trim().toLowerCase() === 'quit') {
    rl.close()
  } else {
    rl.setPrompt('Doing whatever you said\n> ')
    rl.prompt()
  }
})
rl.on('close', () => {
  console.log('Bye!\n')
  process.exit(0)
});
