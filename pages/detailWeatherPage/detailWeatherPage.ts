import { BasePage } from "../../core/basePage";
import { MasterTest } from "../../core/configs/masterTest";
import detailWeatherPageRepo from "./detailWeatherPageRepo";

export class DetailWeatherPage extends BasePage {
  constructor(masterTest: MasterTest) {
    super(masterTest);
  }

  public switchMetricUnit = async (unitWitchTo: "F" | "C") => {
    if (unitWitchTo === "F") {
      await this.webUI.commonAction.click(
        detailWeatherPageRepo.switchMetricToFBtn
      );
    } else {
      await this.webUI.commonAction.click(
        detailWeatherPageRepo.switchMetricToCBtn
      );
    }
  };

  // Verification
  public verifyDetailWeatherPageDisplayed = async (
    expectURL: string | RegExp
  ): Promise<void> => {
    await this.webUI.verification.verifyCurrentPageToHaveURl(expectURL);
  };

  public verifyCurrentDataUnit = async (
    unitWitchTo: "F" | "C"
  ): Promise<void> => {
    if (unitWitchTo === "C") {
      await this.webUI.verification.verifyElementToContainText(
        detailWeatherPageRepo.currentTempLbl,
        "°C"
      );
      await this.webUI.verification.verifyElementToContainText(
        detailWeatherPageRepo.dayForecastTemLbl,
        "°C"
      );
      await this.webUI.verification.verifyElementToContainText(
        detailWeatherPageRepo.windLineLbl,
        "m/s"
      );
    } else {
      await this.webUI.verification.verifyElementToContainText(
        detailWeatherPageRepo.currentTempLbl,
        "°F"
      );
      await this.webUI.verification.verifyElementToContainText(
        detailWeatherPageRepo.dayForecastTemLbl,
        "°F"
      );
      await this.webUI.verification.verifyElementToContainText(
        detailWeatherPageRepo.windLineLbl,
        "mph"
      );
    }
  };
}
