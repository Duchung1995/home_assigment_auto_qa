import { Locator, Page } from "@playwright/test";
import { Logger } from "../helper/logger";
import { MasterTest } from "../configs/masterTest";

export class CommonAction {
  private readonly page: Page;
  private readonly logger: Logger;

  constructor(masterTest: MasterTest) {
    this.page = masterTest.page;
    this.logger = masterTest.logger;
  }

  public findElement = async (seletcor: string): Promise<Locator> => {
    try {
      await this.page.waitForLoadState("load");
      return await this.page.locator(seletcor);
    } catch (error) {
      await this.logger.error(error);
      throw error;
    }
  };

  public goto = async (url: string): Promise<void> => {
    try {
      await this.logger.info(`Go to URL: ${url}`);
      await this.page.goto(url, { waitUntil: "load" });
    } catch (error) {
      await this.logger.error(error);
      throw error;
    }
  };

  public click = async (selector: string): Promise<void> => {
    try {
      await this.logger.info(`Click on:${selector}`);
      let locator = await this.findElement(selector);
      await locator.click();
    } catch (error) {
      await this.logger.error(error);
      throw error;
    }
  };

  public fill = async (selector: string, value: string): Promise<void> => {
    try {
      await this.logger.info(`Fill on: ${selector} with value: ${value}`);
      const locator = await this.findElement(selector);
      await locator.fill(value);
    } catch (error) {
      await this.logger.error(error);
      throw error;
    }
  };

  public pressKey = async (selector: string, key: string): Promise<void> => {
    try {
      await this.logger.info(`Press key: ${key}`);
      const locator = await this.findElement(selector);
      await locator.press(key);
    } catch (error) {
      await this.logger.error(error);
      throw error;
    }
  };
}
