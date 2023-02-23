import { expect, Page } from "@playwright/test";
import { MasterTest } from "../configs/masterTest";
import { Logger } from "../helper/logger";
import { CommonAction } from "./commonAction";

export class Verification {
  private page: Page;
  private logger: Logger;
  private commonAction: CommonAction;
  constructor(masterTest: MasterTest) {
    this.page = masterTest.page;
    this.logger = masterTest.logger;
    this.commonAction = new CommonAction(masterTest);
  }

  public verifyElementToBeVisible = async (selector: string): Promise<void> => {
    await this.logger.info(`Verify element ${selector} to be visible`);
    const locator = await this.commonAction.findElement(selector);
    await expect(
      locator,
      `Element ${selector} not to be visible`
    ).toBeVisible();
  };

  public verifyElementToBeInVisible = async (
    selector: string
  ): Promise<void> => {
    await this.logger.info(`Verify element ${selector} to be invisible`);
    const locator = await this.commonAction.findElement(selector);
    await expect(locator, `Verify element ${selector} to be invisible`).toBeVisible({
      visible: false,
    });
  };

  public verifyElementToBeDisabled = async (
    selector: string
  ): Promise<void> => {
    await this.logger.info(`Verify element ${selector} to be disable`);
    const locator = await this.commonAction.findElement(selector);
    await expect(locator, `Verify element ${selector} to be disable`).toBeDisabled();
  };

  public verifyElementToContainText = async (
    selector: string,
    expectTxt: string | RegExp | (string | RegExp)[]
  ): Promise<void> => {
    await this.logger.info(
      `Verify element ${selector} to contain text ${expectTxt}`
    );
    const locator = await this.commonAction.findElement(selector);
    await expect(
      locator,
      `Element ${selector} to contain text ${expectTxt}`
    ).toContainText(expectTxt);
  };

  public verifyCurrentPageToHaveURl = async (
    expectURL: string | RegExp
  ): Promise<void> => {
    await this.logger.info(`Verify current page to have URL: ${expectURL}`);
    await expect(this.page, `Verify current page to have URL: ${expectURL}`).toHaveURL(
      expectURL
    );
  };

  public verifyCurrentPageToHaveTitle = async (
    expectPageTitle: string | RegExp
  ): Promise<void> => {
    await this.logger.info(
      `Verify current page to have title: ${expectPageTitle}`
    );
    await expect(
      this.page,
      `Verify current page to have title: ${expectPageTitle}`
    ).toHaveTitle(expectPageTitle);
  };
}
