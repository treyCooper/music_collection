class MusicCollection {
  constructor () {
    this.greeting = 'Welcome to your music collection!'
    this.songs = []
  }

  greet () {
    return this.greeting
  }

  add ({title, artist}) {
    // TODO check if song already exists
    this.songs.push({title, artist, played: false})
    return `Added \"${title}\" by ${artist}`
  }

  play (title) {
    const song = this.songs.find(song => song.title === title)
    if (!song) {
      return `${title} is not your collection`
    }
    song.played = true
    return `You\'re listening to \"${title}"`
  }

  show ({songs, showPlayedStatus} = {songs: this.songs, showPlayedStatus: true}) {
    let list = ''
    for (const song of songs) {
      let songInfo = `"${song.title}" by ${song.artist}`
      if (showPlayedStatus) {
        songInfo +=  ` ${song.played ? '\(played\)' : '\(unplayed\)'}`
      }
      songInfo += '\n'
      list += songInfo
    }
    return list
  }

  showByArtist (artist) {
    const songsbyArtist = this.songs.filter(song => song.artist === artist)
    return this.show({songs: songsbyArtist, showPlayedStatus: true})
  }

  showUnplayed () {
    const uplayedSongs = this.songs.filter(song => song.played === false)
    return this.show({songs: uplayedSongs, showPlayedStatus: false})
  }

  showUnplayedByArtist (artist) {
    const uplayedSongsByArtist = this.songs.filter(song => song.played === false && song.artist === artist)
    return this.show({songs: uplayedSongsByArtist, showPlayedStatus: false})
  }

}
module.exports = MusicCollection
