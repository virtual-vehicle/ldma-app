module.exports = {
    getSourceExts: () => process.env.RN_SRC_EXT === 'E2E' ? ['e2emock.js'] : []
  }