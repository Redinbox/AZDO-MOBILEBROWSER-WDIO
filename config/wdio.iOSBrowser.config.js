const { config } = require("./wdio.shared.config");
const iOSInfo = require("./iOS.info");

const waitforTimeout = 30 * 30000;
const commandTimeout = 30 * 30000;
const host = "127.0.0.1";
const port = 4730;
const portiOS = 4444;
const path = "/wd/hub";

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
    maxInstances: 1,
    platformName: "iOS",
    nativeWebTap: true,
    browserName: "safari",
    acceptInsecureCerts: true,
    automationName: "XCUITest",
    deviceName: iOSInfo.deviceName(),
    platformVersion: iOSInfo.platFormVersion(),
    deviceOrientation: "portriat",
    log: { level: "trace" },
    avd: iOSInfo.deviceName(),
    newCommandTimeout: commandTimeout,
  },
];
exports.config = config;
