import { APIRequestContext, APIResponse } from "@playwright/test";
import { MasterTest } from "../configs/masterTest";
import { Logger } from "../helper/logger";
export class Request {
  private apiRequest: APIRequestContext;
  private logger: Logger;

  constructor(masterTest: MasterTest) {
    this.apiRequest = masterTest.apiRequest;
    this.logger = masterTest.logger;
  }

  public get = async (
    endpoint: string,
    headers: { [key: string]: string },
    params?: { [p: string]: string | number | boolean }
  ): Promise<APIResponse> => {
    try {
      await this.logger.info(`Call GET API to endpoint: ${endpoint}`);
      return await this.apiRequest.get(endpoint, {
        headers: headers,
        params: params,
      });
    } catch (error) {
      await this.logger.error(error);
      throw error;
    }
  };

  public post = async (
    endpoint: string,
    data?: any,
    headers?: { [key: string]: string },
    params?: any
  ): Promise<APIResponse> => {
    try {
      await this.logger.info(`Call POST API to endpoint: ${endpoint}`);
      return await this.apiRequest.post(endpoint, {
        data: data,
        headers: headers,
        params: params,
      });
    } catch (error) {
      await this.logger.error(error);
      throw error;
    }
  };
}
