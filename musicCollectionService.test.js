
const MusicCollectionService = require('./MusicCollectionService')
let musicCollectionService = new MusicCollectionService()


beforeEach(() => {
  musicCollectionService = new MusicCollectionService()
})

describe('greeting', () => {
  test('returns correct greeting', () => {
    expect(musicCollectionService.greet()).toBe('Welcome to your music collection!');
  })
})

describe('add', () => {
  test('returns album added message', () => {
    expect(musicCollectionService.add({title: 'Animals', artist: 'Pink Floyd'})).toBe('Added \"Animals\" by Pink Floyd')
  })
  test('adds album to collection', () => {
    musicCollectionService.add({title: 'Waltz for Debby', artist: 'Bill Evans Trio'})
    expect(musicCollectionService.show()).toEqual(expect.stringMatching('\"Waltz for Debby\" by Bill Evans Trio'))
  })
  test('does not allow duplicate albums', () => {
    musicCollectionService.add({title: 'Waltz for Debby', artist: 'Bill Evans Trio'})
    expect(musicCollectionService.add({title: 'Waltz for Debby', artist: 'Cannonball Adderley'})).toEqual(expect.stringMatching('You already have an album called \"Waltz for Debby\"'))
  })
})

describe('play', () => {
  test('returns playing message', () => {
    musicCollectionService.add({title: 'The Dark Side of the Moon', artist: 'Pink Floyd'})
    expect(musicCollectionService.play('The Dark Side of the Moon')).toBe(`You\'re listening to \"The Dark Side of the Moon\"`)
  })
  test('updates played status', () => {
    musicCollectionService.add({title: 'The Dark Side of the Moon', artist: 'Pink Floyd'})
    musicCollectionService.play('The Dark Side of the Moon')
    expect(musicCollectionService.show()).toEqual(expect.stringMatching(/\"The Dark Side of the Moon\" by Pink Floyd \(played\)/))
  })
})

describe('showAll', () => {
  test('lists all albums', () => {
    musicCollectionService.add({title: 'The Dark Side of the Moon', artist: 'Pink Floyd'})
    musicCollectionService.add({title: 'Animals', artist: 'Pink Floyd'})
    musicCollectionService.play("The Dark Side of the Moon")
    expect(musicCollectionService.show()).toEqual(expect.stringMatching(/\"The Dark Side of the Moon\" by Pink Floyd \(played\)/) && expect.stringMatching(/\"Animals\" by Pink Floyd \(unplayed\)/))
  })
})

describe('showAllByArtist', () => {
  test('lists all albums by artist', () => {
    musicCollectionService.add({title: 'The Dark Side of the Moon', artist: 'Pink Floyd'})
    musicCollectionService.add({title: 'Animals', artist: 'Pink Floyd'})
    musicCollectionService.play("The Dark Side of the Moon")
    musicCollectionService.add({title: 'Dinner Party', artist: 'Terrace Martin'})
    expect(musicCollectionService.showAllByArtist('Pink Floyd')).toEqual(expect.stringMatching(/\"The Dark Side of the Moon\" by Pink Floyd \(played\)/) && expect.stringMatching(/\"Animals\" by Pink Floyd \(unplayed\)/))
    expect(musicCollectionService.showAllByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\"Dinner Party\" by Terrace Martin/))
  })
})

describe('showByUnplayedByArtist', () => {
  test('lists all unplayed albums by artist', () => {
    musicCollectionService.add({title: 'The Dark Side of the Moon', artist: 'Pink Floyd'})
    musicCollectionService.add({title: 'Animals', artist: 'Pink Floyd'})
    musicCollectionService.play("The Dark Side of the Moon")
    musicCollectionService.add({title: 'Dinner Party', artist: 'Terrace Martin'})
    expect(musicCollectionService.showUnplayedByArtist('Pink Floyd')).toEqual(expect.stringMatching(/\"Animals\" by Pink Floyd/))
    expect(musicCollectionService.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\"The Dark Side of the Moon\" by Pink Floyd/))
    expect(musicCollectionService.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\"Dinner Party\" by Terrace Martin/))
  })
  test('does not display played status', () => {
    musicCollectionService.add({title: 'The Dark Side of the Moon', artist: 'Pink Floyd'})
    expect(musicCollectionService.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\(played\)/))
    expect(musicCollectionService.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\(unplayed\)/))
  })
})

describe('showByUnplayed', () => {
  test('lists all unplayed albums by artist', () => {
    musicCollectionService.add({title: 'The Dark Side of the Moon', artist: 'Pink Floyd'})
    musicCollectionService.add({title: 'Animals', artist: 'Pink Floyd'})
    musicCollectionService.play("The Dark Side of the Moon")
    musicCollectionService.add({title: 'Dinner Party', artist: 'Terrace Martin'})
    expect(musicCollectionService.showUnplayed()).toEqual(expect.stringMatching(/\"Dinner Party\" by Terrace Martin/))
    expect(musicCollectionService.showUnplayed()).toEqual(expect.stringMatching(/\"Animals\" by Pink Floyd/))
    expect(musicCollectionService.showUnplayed()).not.toEqual(expect.stringMatching(/\"The Dark Side of the Moon\" by Pink Floyd/))
  })
  test('does not display played status', () => {
    musicCollectionService.add({title: 'The Dark Side of the Moon', artist: 'Pink Floyd'})
    expect(musicCollectionService.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\(played\)/))
    expect(musicCollectionService.showUnplayedByArtist('Pink Floyd')).not.toEqual(expect.stringMatching(/\(unplayed\)/))
  })
})
