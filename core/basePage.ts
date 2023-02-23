import { Expect, Page } from "@playwright/test";
import { dynamicEnvSettings } from "./configs/dynamicEnvSettings";
import CommonHelper from "./helper/commonHelper";
import FileHelper from "./helper/fileHelper";
import { Logger } from "./helper/logger";
import StringHelper from "./helper/stringHelper";
import { MasterTest } from "./configs/masterTest";
import { WebUI } from "./webUI/webUI";
import { API } from "./api/api";

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly logger: Logger;
  protected readonly webUI: WebUI;
  protected readonly api: API;
  protected readonly commonHelper: CommonHelper;
  protected readonly fileHelper: FileHelper;
  protected readonly stringHelper: StringHelper;

  constructor(masterTest: MasterTest) {
    this.page = masterTest.page;
    this.logger = masterTest.logger;
    this.webUI = new WebUI(masterTest);
    this.api = new API(masterTest);
    this.commonHelper = new CommonHelper();
    this.fileHelper = new FileHelper();
    this.stringHelper = new StringHelper();
  }

  protected goTo = async (path?: string): Promise<void> => {
    let url: string = `${dynamicEnvSettings.baseURL}/${path}`;
    if (path === undefined || null) {
      url = dynamicEnvSettings.baseURL;
    }
    await this.webUI.commonAction.goto(url);
  };
}
