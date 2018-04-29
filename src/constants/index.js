export default {
  ERROR_MEMO: {
    id: -1,
    title: 'unknown',
    description: 'unknown',
    platforms: [],
    million: false,
    releasedAt: null
  },
  NEW_EMPTY_MEMO () {
    return {
      id: 0,
      title: '',
      description: '',
      platforms: [],
      million: false,
      releasedAt: null
    }
  },
  PLATFORMS: ['FC', 'SFC', 'GB', '64', 'GC', 'DS', 'Wii', '3DS', 'Wii U', 'Switch']
}
