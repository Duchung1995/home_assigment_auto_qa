import { request, TestInfo } from "@playwright/test";
import { MasterTest } from "./masterTest";
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  LaunchOptions,
  webkit,
  WebKitBrowser,
} from "@playwright/test";
import { dynamicEnvSettings } from "./dynamicEnvSettings";
import BrowserConstants from "../constants/browserConstants";
import { Logger } from "../helper/logger";

export class PlaywrightHooks {
  private logger = new Logger();
  private browserOptions: LaunchOptions = {
    slowMo: dynamicEnvSettings.slowMode * 1000,
    args: ["--disable-extensions", "--disable-plugins"],
  };

  // Supported 3 browser type: "chromium", "webkit", or "firefox"
  private launchBrowser = async () => {
    let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
    const browserType = dynamicEnvSettings.browserType;
    if (BrowserConstants.FIREFOX === browserType) {
      browser = await firefox.launch(this.browserOptions);
    } else if (BrowserConstants.WEBKIT === browserType) {
      browser = await webkit.launch(this.browserOptions);
    } else if (BrowserConstants.CHROMIUM === browserType) {
      browser = await chromium.launch(this.browserOptions);
    } else {
      throw new Error(
        `Not support browser type: ${dynamicEnvSettings.browserType}`
      );
    }
    return browser;
  };

  public initialize = async (testInfo: TestInfo): Promise<MasterTest> => {
    await this.logger.testBegin(testInfo);
    await this.logger.info(dynamicEnvSettings.browserType);
    // Starts a new browser
    const browser = await this.launchBrowser();
    // Initializes a context inside it
    const context = await browser.newContext();
    // Create a new page which will execute the code
    const page = await context.newPage();
    // Initializes a api context inside it that all requests are sent with accurate information
    const api = await request.newContext({
      baseURL: dynamicEnvSettings.baseURI,
    });
    const masterTest = {
      browser: browser,
      context: context,
      page: page,
      apiRequest: api,
      logger: this.logger,
    };
    return masterTest;
  };

  public eachTest = async (testInfo: TestInfo): Promise<void> => {
    await this.logger.info(`Test scenario: ${testInfo.title}`);
  };

  public tearDown = async (masterTest: MasterTest): Promise<void> => {
    await this.logger.testEnd();
    // Close a single page
    await masterTest.page.close();
    // Close all active pages
    await masterTest.browser.close();
    // Close the browser and exit the Node process
    await masterTest.context.close();
  };
}
