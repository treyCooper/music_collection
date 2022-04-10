class MusicCollectionService {
  constructor () {
    this.greeting = 'Welcome to your music collection!'
    this.albums = []
  }

  greet () {
    return this.greeting
  }

  add ({title, artist}) {
    const album = this.albums.find(album => album.title.toLowerCase() === title.toLowerCase())
    if (album) {
      return `You already have an album called \"${title}\"`
    }
    this.albums.push({title, artist, played: false})
    return `Added \"${title}\" by ${artist}`
  }

  play (title) {
    const album = this.albums.find(album => album.title.toLowerCase() === title.toLowerCase())
    if (!album) {
      return `${title} is not in your collection`
    }
    album.played = true
    return `You\'re listening to \"${album.title}"`
  }

  show ({albums, showPlayedStatus} = {albums: this.albums, showPlayedStatus: true}) {
    let list = ''
    for (const [index, album] of albums.entries()) {
      let albumInfo = `"${album.title}" by ${album.artist}`
      if (showPlayedStatus) {
        albumInfo +=  ` ${album.played ? '\(played\)' : '\(unplayed\)'}`
      }
      if (index < albums.length - 1) {
        albumInfo += '\n'
      }
      list += albumInfo
    }
    return list
  }

  showAllByArtist (artist) {
    const albumsbyArtist = this.albums.filter(album => album.artist.toLowerCase() === artist.toLowerCase())
    return this.show({albums: albumsbyArtist, showPlayedStatus: true})
  }

  showUnplayed () {
    const unplayedalbums = this.albums.filter(album => album.played === false)
    return this.show({albums: unplayedalbums, showPlayedStatus: false})
  }

  showUnplayedByArtist (artist) {
    const unplayedalbumsByArtist = this.albums.filter(album => album.played === false && album.artist.toLowerCase() === artist.toLowerCase())
    return this.show({albums: unplayedalbumsByArtist, showPlayedStatus: false})
  }

}
module.exports = MusicCollectionService
