export class DetailWeatherPageRepo {
  public readonly switchMetricToCBtn: string =
    "div[class='switch-container'] div:nth-child(2)";
  public readonly switchMetricToFBtn: string =
    "//div[contains(text(),'Imperial: °F, mph')]";
  public readonly currentTempLbl: string = "//span[@class='heading']";
  public readonly dayForecastTemLbl: string =
    "(//div[@class='day-list-values'])[1]";
  public readonly windLineLbl: string = "//div[@class='wind-line']";
}
export default new DetailWeatherPageRepo();
