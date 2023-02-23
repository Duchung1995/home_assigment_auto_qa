import { Page } from "@playwright/test";
import { BasePage } from "../../core/basePage";
import { MasterTest } from "../../core/configs/masterTest";
import commonPageRepo from "./commonPageRepo";

export class CommonPage extends BasePage {
  constructor(masterTest: MasterTest) {
    super(masterTest);
  }

  public inputSearchKeyword = async (keyword: string) => {
    await this.webUI.commonAction.fill(commonPageRepo.searchBoxTxt, keyword);
  };
  public clickOnSearchBtn = async () => {
    await this.webUI.commonAction.click(commonPageRepo.searchBtn);
  };

  public searchWeatherInCityByKeyword = async (keyword: string) => {
    await this.inputSearchKeyword(keyword);
    await this.webUI.commonAction.pressKey(
      commonPageRepo.searchBoxTxt,
      "Enter"
    );
  };
}
