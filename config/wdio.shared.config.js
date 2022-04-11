const fs = require("fs");
const allure = require("@wdio/allure-reporter").default;
const assert = require("assert");
const chai = require("chai");
const rimraf = require("rimraf");
const getLogger = require("@wdio/logger").default;
const log = getLogger("hooks");
const path = require("path");
const reportportal = require("wdio-reportportal-reporter");
const Allure = require("allure-js-commons");

const host = "127.0.0.1";
const port = 4730;
const waitforTimeout = 30 * 6000;
const commandTimeout = 30 * 6000;
var timeout = process.env.DEBUG ? 300000 : 60000;
let tests = 0;

exports.config = {
  runner: "local",

  specs: ["./test/specs/*.ts"],

  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "trace",

  reporters: [
    "spec",
    [
      "junit",
      {
        outputDir: "./output/",
        outputFileFormat: function (opts) {
          return `test-results.xml`;
        },
      },
    ],
  ],

  maxInstances: 1,
  connectionRetryCount: 3,

  baseUrl: "https://rakuten.com/",

  services: [
    [
      "appium",
      {
        command: "appium",
        logPath: "./",

        args: {
          relaxedSecurity: true,
          address: host,
          port: port,
          commandTimeout: commandTimeout,
          sessionOverride: true,
          debugLogSpacing: true,
        },
      },
    ],
  ],

  /**
   * test configurations
   */
  coloredLogs: true,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: timeout,
    require: "ts-node/register",
    compilers: ["tsconfig-paths/register"],
  },
  bail: 0,

  onPrepare: function () {
    console.log("<<<On Preparing >>>");
  },

  before: async function (capabilities, specs) {
    global.wdioExpect = global.expect;
    global.expect = chai.expect;
    global.assert = assert;
    await browser.url(this.baseUrl);
    console.log("<<< BROWSER TESTS STARTED >>>" + this.baseUrl);
  },

  beforeSuite: async function (suite) {},

  beforeTest: function (test, context) {
    log.debug(`Test "${test.title}" starts`);
  },

  afterSession: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    console.log("afterSession");
  },

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    log.debug(`Test "${test.title}" finished`);

    if (passed) {
      return;
    }
    const browserName = browser.capabilities.browserName;
    const timestamp = new Date().toJSON().replace(/:/g, "-");
    const filename = "TESTFAIL.png";
    const filePath = path.join("./jscreenshots", filename);

    // save screenshot
    await browser.saveScreenshot(filePath);
    console.log("\tSaved screenshot: ", filePath);

    if (error) {
      await browser.takeScreenshot();
      console.log("Error capturing screenshot: ", error);
    } else {
      console.log("after the test ,test was passed");
    }
  },

  onComplete: function () {
    console.log("<<< TESTING FINISHED >>>");
  },
};
