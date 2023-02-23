import {
  Page,
  BrowserContext,
  APIRequestContext,
  ChromiumBrowser,
  FirefoxBrowser,
  WebKitBrowser,
} from "@playwright/test";
import { Logger } from "../helper/logger";

export type MasterTest = {
  browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
  context: BrowserContext;
  page: Page;
  apiRequest: APIRequestContext;
  logger: Logger;
};
