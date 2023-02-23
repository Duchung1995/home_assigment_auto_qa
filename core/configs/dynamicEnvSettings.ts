import appSettings from "../../appSettings.json";

export let dynamicEnvSettings: {
  baseURL: string;
  baseURI: string;
  browserType: string;
  slowMode: number;
};

if ("SIT" === process.env.ENV) {
  dynamicEnvSettings = appSettings.SIT;
} else if ("UAT" === process.env.ENV) {
  dynamicEnvSettings = appSettings.UAT;
} else {
  process.env.ENV = "SIT";
  dynamicEnvSettings = appSettings.SIT;
}
