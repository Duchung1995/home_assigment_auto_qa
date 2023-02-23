import { BasePage } from "../../core/basePage";
import { MasterTest } from "../../core/configs/masterTest";
import searchResultPageRepo from "./searchResultPageRepo";

export class SearchResultPage extends BasePage {
  constructor(masterTest: MasterTest) {
    super(masterTest);
  }

  public clickOnCityLink = async (): Promise<void> => {
    await this.webUI.commonAction.click(searchResultPageRepo.cityNameLnk);
  };

  // Verification
  public verifySearchResultPageDisplayed = async (): Promise<void> => {
    await this.webUI.verification.verifyElementToBeVisible(
      searchResultPageRepo.searchResultPageHeadline
    );
    await this.webUI.verification.verifyElementToBeVisible(
      searchResultPageRepo.searchBoxTxt
    );
  };

  public verifyCitySearchedDisplayInResult = async (): Promise<void> => {
    await this.webUI.verification.verifyElementToBeVisible(
      searchResultPageRepo.cityNameLnk
    );
  };

  public verifyNoCityReturnInResult = async (): Promise<void> => {
    await this.webUI.verification.verifyElementToBeVisible(
      searchResultPageRepo.notFoundAlertWarning
    );
  };
}
