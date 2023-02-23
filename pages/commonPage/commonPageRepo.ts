export class CommonPageRepo {
  public readonly searchBoxTxt: string =
    "//div[@id='desktop-menu']//input[@type='text']";
  public readonly searchBtn: string =
    "//div[@id='desktop-menu']//input[@type='submit']";
}
export default new CommonPageRepo();
