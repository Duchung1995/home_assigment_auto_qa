import { TestInfo } from "@playwright/test";
import winston from "winston";

const log = winston.createLogger({
  //Log console
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.uncolorize({ level: true, message: true, raw: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
    // Log to file
    new winston.transports.File({
      filename: "./testOutput/logs/execution.log",
      format: winston.format.combine(
        winston.format.uncolorize({ level: true, message: true, raw: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

const TEST_SEPARATOR = "-------";

export class Logger {
  private printLogTestProgress = async (
    msg: string,
    separator: string
  ): Promise<void> => {
    log.info(`${separator}${msg}${separator}`);
  };

  public testBegin = async (testInfo: TestInfo): Promise<void> => {
    log.info(`Test file: ${testInfo.file}`);
    this.printLogTestProgress(`Started`, TEST_SEPARATOR);
  };

  public testEnd = async (): Promise<void> => {
    this.printLogTestProgress(`End`, TEST_SEPARATOR);
  };

  public info = async (message: string): Promise<void> => {
    log.info(message);
  };

  public error = async (error: string): Promise<void> => {
    log.error(error);
  };

  public debug = async (debug: string): Promise<void> => {
    log.debug(debug);
  };
}
