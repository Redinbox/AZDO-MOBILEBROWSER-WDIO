const getLogger = require("@wdio/logger").default;
const log = getLogger("hooks");
import assert = require("assert");

describe("Test browser navigation", async () => {
  beforeEach(async () => {
    console.log("Before Each Test");
    await browser.url("./");
    await browser.pause(5000);
    await browser.setTimeout({ pageLoad: 99999999 });
  });

  it("Verify navigation url", async () => {
    try {
      const isMobile = driver.isMobile;

      if (isMobile) {
        var title = await browser.getTitle();
        console.log(title);
        assert.strictEqual(title, "Amazon", "Title is same as expected");
        log.info("verify mobile browser");
      }
    } catch (e) {
      console.log("error: " + e.message);
      throw e;
    }
  });

  afterEach(async () => {
    console.log("after Each Test");
    try {
      console.log("no error");
    } catch (e) {
      throw new Error(`Error on test. ERR: ${e}`);
    }
  });
});
