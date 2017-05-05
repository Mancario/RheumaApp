exports.config = {
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--disable-web-security']
    }
  },

  baseUrl: 'http://localhost:8100',

  specs: [
    'e2e-tests/*.e2e.js'
    //'e2e-tests/pain-diary.e2e.js'
  ],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true
  },

  allScriptsTimeout: 20000
};
