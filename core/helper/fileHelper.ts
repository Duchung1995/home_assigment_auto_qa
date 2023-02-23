import fs from "fs";

export default class FileHelper {
  public async parseJsonFile(jsonPath: string) {
    const data = fs.readFileSync(jsonPath, "utf-8");
    return await JSON.parse(data);
  }
}
