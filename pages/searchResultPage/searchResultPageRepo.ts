export class SearchResultPageRepo {
  public readonly searchResultPageHeadline: string = "h2[class*='headline']";
  public readonly searchBoxTxt: string = "#search_str";
  public readonly cityNameLnk: string =
    "(//div[@id='forecast_list_ul']//a[contains(@href,'/city')])[1]";
  public readonly notFoundAlertWarning: string = "div.alert.alert-warning";
}
export default new SearchResultPageRepo();
