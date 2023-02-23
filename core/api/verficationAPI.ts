import { APIResponse, expect } from "@playwright/test";

export class VerificationAPI {
  constructor() {}

  async verifyStatusCode(
    response: APIResponse,
    statusCode: number
  ): Promise<void> {
    await expect(
      response.status(),
      `Verify status code ${statusCode}.`
    ).toEqual(statusCode);
  }
}
