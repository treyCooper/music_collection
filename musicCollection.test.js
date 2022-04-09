
const MusicCollection = require('./MusicCollection')
let musicCollection = new MusicCollection()


beforeEach(() => {
  musicCollection = new MusicCollection()
})

describe('greeting', () => {
  test('returns correct greeting', () => {
    expect(musicCollection.greet()).toBe('Welcome to your music collection!');
  })
})

describe('add', () => {
  test('returns song added message', () => {
    expect(musicCollection.add({title: 'Time', artist: 'Pink Floyd'})).toBe('Added \"Time\" by Pink Floyd')
  })
  test('adds song to collection', () => {
    musicCollection.add({title: 'Dead End', artist: 'Brainstory'})
    expect(musicCollection.show()).toEqual(expect.stringMatching('\"Dead End\" by Brainstory'))
  })
})

describe('play', () => {
  test('returns playing message', () => {
    musicCollection.add({title: 'Money', artist: 'Pink Floyd'})
    expect(musicCollection.play('Money')).toBe(`You\'re listening to \"Money\"`)
  })
  test('updates played status', () => {
    musicCollection.add({title: 'Money', artist: 'Pink Floyd'})
    musicCollection.play('Money')
    expect(musicCollection.show()).toEqual(expect.stringMatching(/\"Money\" by Pink Floyd \(played\)/))
  })
})

describe('showAll', () => {
  test('lists all songs', () => {
    musicCollection.add({title: 'Money', artist: 'Pink Floyd'})
    musicCollection.add({title: 'Time', artist: 'Pink Floyd'})
    musicCollection.play("Money")
    expect(musicCollection.show()).toEqual(expect.stringMatching(/\"Money\" by Pink Floyd \(played\)/) && expect.stringMatching(/\"Time\" by Pink Floyd \(unplayed\)/))
  })
})

describe('showByArtist', () => {
  test('lists all songs by artist', () => {
    musicCollection.add({title: 'Money', artist: 'Pink Floyd'})
    musicCollection.add({title: 'Time', artist: 'Pink Floyd'})
    musicCollection.play("Money")
    musicCollection.add({title: 'Sleepless Nights', artist: 'Terrace Martin'})
    expect(musicCollection.showByArtist('Pink Floyd')).toEqual(expect.stringMatching(/\"Money\" by Pink Floyd \(played\)/) && expect.stringMatching(/\"Time\" by Pink Floyd \(unplayed\)/))
    expect(musicCollection.showByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\"Sleepless Nights\" by Terrace Martin/))
  })
})

describe('showByUnplayedByArtist', () => {
  test('lists all unplayed songs by artist', () => {
    musicCollection.add({title: 'Money', artist: 'Pink Floyd'})
    musicCollection.add({title: 'Time', artist: 'Pink Floyd'})
    musicCollection.play("Money")
    musicCollection.add({title: 'Sleepless Nights', artist: 'Terrace Martin'})
    expect(musicCollection.showUnplayedByArtist('Pink Floyd')).toEqual(expect.stringMatching(/\"Time\" by Pink Floyd/))
    expect(musicCollection.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\"Money\" by Pink Floyd/))
    expect(musicCollection.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\"Sleepless Nights\" by Terrace Martin/))
  })
  test('does not display played status', () => {
    musicCollection.add({title: 'Money', artist: 'Pink Floyd'})
    expect(musicCollection.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\(played\)/))
    expect(musicCollection.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\(unplayed\)/))
  })
})

describe('showByUnplayed', () => {
  test('lists all unplayed songs by artist', () => {
    musicCollection.add({title: 'Money', artist: 'Pink Floyd'})
    musicCollection.add({title: 'Time', artist: 'Pink Floyd'})
    musicCollection.play("Money")
    musicCollection.add({title: 'Sleepless Nights', artist: 'Terrace Martin'})
    expect(musicCollection.showUnplayed()).toEqual(expect.stringMatching(/\"Sleepless Nights\" by Terrace Martin/))
    expect(musicCollection.showUnplayed()).toEqual(expect.stringMatching(/\"Time\" by Pink Floyd/))
    expect(musicCollection.showUnplayed()).not.toEqual(expect.stringMatching(/\"Money\" by Pink Floyd/))
  })
  test('does not display played status', () => {
    musicCollection.add({title: 'Money', artist: 'Pink Floyd'})
    expect(musicCollection.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\(played\)/))
    expect(musicCollection.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\(unplayed\)/))
  })
})
