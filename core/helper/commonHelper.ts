export default class CommonHelper {
  public async getCurrentTimeStamp(): Promise<number> {
    return Date.now();
  }

  public async generateUniqueString(itemName: string): Promise<string> {
    return `${itemName}${await this.getCurrentTimeStamp()}`;
  }

  public async generateRandomPhoneNumber(): Promise<number> {
    const min = 111000000;
    const max = 999999999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public async generateRandomEmailWithPrefix(prefix: string): Promise<string> {
    return `${prefix}${await this.getCurrentTimeStamp()}@nomail.com`;
  }

  public async generateRandomEmail(): Promise<string> {
    return `${await this.getCurrentTimeStamp()}@nomail.com`;
  }

  public async generateRandomNumber(max: number): Promise<number> {
    return Math.floor(max);
  }
}
