import { APIResponse } from "@playwright/test";
import { BasePage } from "../../core/basePage";
import { MasterTest } from "../../core/configs/masterTest";
import homePageRepo from "./homePageRepo";

export class HomePage extends BasePage {
  constructor(masterTest: MasterTest) {
    super(masterTest);
  }

  public navigateToHomePage = async (): Promise<void> => {
    await this.goTo();
  };

  public callApiGetCurrentWeather = async (
    endpoint: string,
    headers: {
      [key: string]: string;
    },
    params?: {
      [p: string]: string | number | boolean;
    }
  ) => {
    return await this.api.request.get(endpoint, headers, params);
  };

  // Verification
  public verifyHomePageDisplayed = async (
    expectPageTitle: string | RegExp
  ): Promise<void> => {
    await this.webUI.verification.verifyElementToBeVisible(
      homePageRepo.switchMetricToCBtn
    );
    await this.webUI.verification.verifyCurrentPageToHaveTitle(expectPageTitle);
  };

  public verifyAPIReturnWithCurrentWeatherData = async (
    res: APIResponse,
    statusCode: number
  ): Promise<void> => {
    await this.api.verficationAPI.verifyStatusCode(res, statusCode);
  };
}
