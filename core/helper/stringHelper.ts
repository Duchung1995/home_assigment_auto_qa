export default class StringHelper {
  /***
   * Use stringFormat if you need to insert the value of variable into another string
   * @param stringFormat - String to format
   * @param args - List of arguments
   * @constructor
   * formatText = StringFormat("Hello '{0}'", "World!")
   */
  public static async stringFormat(
    stringFormat: string,
    ...args: string[]
  ): Promise<string> {
    return stringFormat.replace(
      /{(\d+)}/g,
      (match, index) => args[index] || ""
    );
  }
}
