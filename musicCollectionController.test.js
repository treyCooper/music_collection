
const MusicCollectionService = require('./MusicCollectionService')
const MusicCollectionController = require('./MusicCollectionController')
jest.mock('./MusicCollectionService')

beforeEach(() => {
  MusicCollectionService.mockClear()
})

describe('calls MusicCollectionService constructor', () => {
  test('instantiates MusicCollectionService', () => {
    new MusicCollectionController()
    expect(MusicCollectionService).toHaveBeenCalledTimes(1)
  })
})

describe('greet', () => {
  test('calls greet method', () => {
    const musicCollectionController = new MusicCollectionController()
    musicCollectionController.greet()

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockGreet = mockMusicCollectionServiceInstance.greet
    expect(mockGreet).toHaveBeenCalledWith()
    expect(mockGreet).toHaveBeenCalledTimes(1)
  })
})

describe('returns error for invalid commands', () => {
  test('calls add method', () => {
    const musicCollectionController = new MusicCollectionController()
    const userInput = "malicious user input"
    expect(musicCollectionController.handleInput(userInput)).toBe(`Invalid command ${userInput}`);
  })
})

describe('add method', () => {
  test('calls add method', () => {
    const musicCollectionController = new MusicCollectionController()
    const title = 'OK Computer'
    const artist = 'Radiohead'
    const userInput = `add \n"${title}\n" \n"${artist}\n"`
    musicCollectionController.handleInput(userInput)

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockAdd = mockMusicCollectionServiceInstance.add
    expect(mockAdd).toHaveBeenCalledWith({title, artist})
    expect(mockAdd).toHaveBeenCalledTimes(1)
  })
  test('requires title', () => {
    const musicCollectionController = new MusicCollectionController()
    const userInput = 'add '

    expect(musicCollectionController.handleInput(userInput)).toEqual(expect.stringMatching(('Title must be passed in double quotes as the first argument to the add command')))

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockAdd = mockMusicCollectionServiceInstance.add
    expect(mockAdd).toHaveBeenCalledTimes(0)
  })
  test('requires artist', () => {
    const musicCollectionController = new MusicCollectionController()
    const userInput = 'add '

    expect(musicCollectionController.handleInput(userInput)).toEqual(expect.stringMatching(('Artist must be passed in double quotes as the second argument to the add command')))

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockAdd = mockMusicCollectionServiceInstance.add
    expect(mockAdd).toHaveBeenCalledTimes(0)
  })
})

describe('show all method', () => {
  test('calls show all method', () => {
    const musicCollectionController = new MusicCollectionController()
    const userInput = 'show all'
    musicCollectionController.handleInput(userInput)

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockShowAll = mockMusicCollectionServiceInstance.show
    expect(mockShowAll).toHaveBeenCalledWith()
    expect(mockShowAll).toHaveBeenCalledTimes(1)
  })
})

describe('play method', () => {
  test('calls play method', () => {
    const musicCollectionController = new MusicCollectionController()
    const title = 'OK Computer'
    const userInput = `play \n"${title}\n"`
    musicCollectionController.handleInput(userInput)

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockPlay = mockMusicCollectionServiceInstance.play
    expect(mockPlay).toHaveBeenCalledWith(title)
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })
  test('requires title', () => {
    const musicCollectionController = new MusicCollectionController()
    const userInput = 'play '

    expect(musicCollectionController.handleInput(userInput)).toEqual(expect.stringMatching(('Title must be passed in double quotes as the first argument to the play command')))

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockPlay = mockMusicCollectionServiceInstance.play
    expect(mockPlay).toHaveBeenCalledTimes(0)
  })
})

describe('show unplayed method', () => {
  test('calls show unplayed method', () => {
    const musicCollectionController = new MusicCollectionController()
    const userInput = 'show unplayed'
    musicCollectionController.handleInput(userInput)

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockShowUnplayed = mockMusicCollectionServiceInstance.showUnplayed
    expect(mockShowUnplayed).toHaveBeenCalledWith()
    expect(mockShowUnplayed).toHaveBeenCalledTimes(1)
  })
})

describe('show unplayed by artist method', () => {
  test('calls show unplayed by artist method', () => {
    const musicCollectionController = new MusicCollectionController()
    const artist = 'Radiohead'
    const userInput = `show unplayed by \n"${artist}\n"`
    musicCollectionController.handleInput(userInput)

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockShowUnplayedByArtist = mockMusicCollectionServiceInstance.showUnplayedByArtist
    expect(mockShowUnplayedByArtist).toHaveBeenCalledWith(artist)
    expect(mockShowUnplayedByArtist).toHaveBeenCalledTimes(1)
  })
  test('requires artist', () => {
    const musicCollectionController = new MusicCollectionController()
    const userInput = 'show unplayed by '

    expect(musicCollectionController.handleInput(userInput)).toEqual(expect.stringMatching(('Artist must be passed in double quotes as the first argument to the show unplayed by command')))

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockShowUnplayedByArtist = mockMusicCollectionServiceInstance.showUnplayedByArtist
    expect(mockShowUnplayedByArtist).toHaveBeenCalledTimes(0)
  })
})


describe('show all by artist method', () => {
  test('calls show all by artist method', () => {
    const musicCollectionController = new MusicCollectionController()
    const artist = 'Radiohead'
    const userInput = `show all by \n"${artist}\n"`
    musicCollectionController.handleInput(userInput)

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockShowAllByArtist = mockMusicCollectionServiceInstance.showAllByArtist
    expect(mockShowAllByArtist).toHaveBeenCalledWith(artist)
    expect(mockShowAllByArtist).toHaveBeenCalledTimes(1)
  })
  test('requires artist', () => {
    const musicCollectionController = new MusicCollectionController()
    const userInput = 'show all by '

    expect(musicCollectionController.handleInput(userInput)).toEqual(expect.stringMatching(('Artist must be passed in double quotes as the first argument to the show all by command')))

    const mockMusicCollectionServiceInstance = MusicCollectionService.mock.instances[0]
    const mockShowAllByArtist = mockMusicCollectionServiceInstance.showAllByArtist
    expect(mockShowAllByArtist).toHaveBeenCalledTimes(0)
  })
})
