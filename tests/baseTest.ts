// my-test.ts
import { test as base } from "@playwright/test";
import { dynamicEnvSettings } from "../core/configs/dynamicEnvSettings";

// Declare the types of your fixtures.
type MyFixtures = {
  baseURL: string;
};

export const test = base.extend<MyFixtures>({
  baseURL: dynamicEnvSettings.baseURL,
});
