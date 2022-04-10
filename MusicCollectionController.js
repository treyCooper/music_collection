const MusicCollectionService = require('./MusicCollectionService')

class MusicCollectionController {
  constructor() {
    this.musicCollectionService = new MusicCollectionService()
  }

  greet () {
    return this.musicCollectionService.greet()
  }

  handleInput (input) {
    const inputSplitByQuotes = input.split('"')
    const trimmedInput = inputSplitByQuotes.map(item => item.trim())
    const filteredInput = trimmedInput.filter(item => item !== '')
    if (filteredInput.length > 3) {
      return 'Too many arguments passed'
    }
    const [command, arg1, arg2] = filteredInput
    switch (command) {
      case 'add':
        return this.add({arg1, arg2})
        break
      case 'show all':
        return this.showAll()
        break
      case 'show all by':
        return this.showAllByArtist(arg1)
        break
      case 'show unplayed':
        return this.showUnplayed()
        break
      case 'show unplayed by':
        return this.showUnplayedByArtist(arg1)
        break
      case 'play':
        return this.play(arg1)
        break
      default:
        return `Invalid command ${command}`
    }
  }

  add ({arg1, arg2} = {}) {
    const title = arg1
    const artist = arg2
    let errorMessage = ''
    if (!title) {
      errorMessage += 'Title must be passed in double quotes as the first argument to the add command. '
    }
    if (!artist) {
      errorMessage += 'Artist must be passed in double quotes as the second argument to the add command. '
    }
    if (errorMessage) {
      return errorMessage
    }
    return this.musicCollectionService.add({title, artist})
  }

  showAll () {
    return this.musicCollectionService.show()
  }

  showUnplayed () {
    return this.musicCollectionService.showUnplayed()
  }

  play (title) {
    let errorMessage = ''
    if (!title) {
      errorMessage += 'Title must be passed in double quotes as the first argument to the play command. '
    }
    if (errorMessage) {
      return errorMessage
    }
    return this.musicCollectionService.play(title)
  }

  showAllByArtist (artist) {
    let errorMessage = ''
    if (!artist) {
      errorMessage += 'Artist must be passed in double quotes as the first argument to the show all by command. '
    }
    if (errorMessage) {
      return errorMessage
    }
    return this.musicCollectionService.showAllByArtist(artist)
  }

  showUnplayedByArtist (artist) {
    let errorMessage = ''
    if (!artist) {
      errorMessage += 'Artist must be passed in double quotes as the first argument to the show unplayed by command. '
    }
    if (errorMessage) {
      return errorMessage
    }
    return this.musicCollectionService.showUnplayedByArtist(artist)
  }

}

module.exports = MusicCollectionController
