exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/e2e/*.js'],
  capabilites: {
    browserName: 'chrome'
  }
};
