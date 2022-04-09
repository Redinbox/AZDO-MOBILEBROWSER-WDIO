const { config } = require("./wdio.shared.config");
const AndroidInfo = require("./android.info");

const waitforTimeout = 30 * 60000;
const commandTimeout = 30 * 60000;
const host = "127.0.0.1"; // default appium host
const port = 4730;

config.capabilities = [
  {
    specs: ["./test/specs/*.spec.ts"],
    services: [
      [
        "appium",
        {
          waitStartTime: 6000,
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
    platformName: "Android",
    browserName: "chrome",
    acceptInsecureCerts: true,
    chromeOptions: {
      args: [
        "--ignore-certificate-errors",
        "--window-size=2600,1800",
        "--allow-http-background-page",
        "--allow-running-insecure-content",
        "--allow-insecure-localhost",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-infobars",
        "--disable-web-security",
        "--disable-popup-blocking",
      ],
    },
    log: { level: "trace" },
    maxInstances: 1,
    automationName: "uiautomator2",
    deviceName: AndroidInfo.deviceName(),
    platformVersion: AndroidInfo.platFormVersion(),
    deviceOrientation: "portriat",
    avd: AndroidInfo.deviceName(),
    waitforTimeout: waitforTimeout,
    commandTimeout: commandTimeout,
    newCommandTimeout: commandTimeout,
  },
];
exports.config = config;
