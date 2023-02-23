import { MasterTest } from "../core/configs/masterTest";
import { PlaywrightHooks } from "../core/configs/playwrightHooks";
import { CommonPage } from "../pages/commonPage/commonPage";
import { HomePage } from "../pages/homePage/homePage";
import * as searchWeatherData from "../data/searchWeather.json";
import { SearchResultPage } from "../pages/searchResultPage/searchResultPage";
import { DetailWeatherPage } from "../pages/detailWeatherPage/detailWeatherPage";
import { test } from "./baseTest";

let masterTest: MasterTest;
let playwrightHooks: PlaywrightHooks;
let homePage: HomePage;
let commonPage: CommonPage;
let searchResultPage: SearchResultPage;
let detailWeatherPage: DetailWeatherPage;
const homePageTitle: string | RegExp =
  /.*weather and forecast - OpenWeatherMap/;
// Get test data from Json File
const validKeyword = searchWeatherData.validKeyword;

test.beforeAll(async ({}, testInfo) => {
  playwrightHooks = new PlaywrightHooks();
  masterTest = await playwrightHooks.initialize(testInfo);
});

test.beforeEach(async ({}, testInfo) => {
  playwrightHooks.eachTest(testInfo);
  homePage = new HomePage(masterTest);
  commonPage = new CommonPage(masterTest);
  searchResultPage = new SearchResultPage(masterTest);
  detailWeatherPage = new DetailWeatherPage(masterTest);
});

test.afterAll(async ({}) => {
  await playwrightHooks.tearDown(masterTest);
});

test(`Verify data of current weather section, hourly weather forecast section, 8-day forecast section is switched from C,m/s to F,mph correctly`, async () => {
  const keyword = validKeyword[0].cityName;
  await test.step("Go to Open Weather homepage", async () => {
    await homePage.navigateToHomePage();
    await homePage.verifyHomePageDisplayed(homePageTitle);
  });
  await test.step(`From the top menu bar, input the keyword ${keyword} into search box and press Enter`, async () => {
    await commonPage.searchWeatherInCityByKeyword(keyword);
    await searchResultPage.verifySearchResultPageDisplayed();
  });
  await test.step(`Verify details weather page displays when user clicks on the city link`, async () => {
    await searchResultPage.clickOnCityLink();
    await detailWeatherPage.verifyDetailWeatherPageDisplayed(/.*city/);
  });
  await test.step(`Verify data of current weather, 8-day forecast section is switched from C,m/s to F,mph correctly`, async () => {
    await detailWeatherPage.switchMetricUnit("F");
    await detailWeatherPage.verifyCurrentDataUnit("F");
  });
  await test.step(`Verify data of current weather, 8-day forecast section is switched from F,mph to C,m/s correctly`, async () => {
    await detailWeatherPage.switchMetricUnit("C");
    await detailWeatherPage.verifyCurrentDataUnit("C");
  });
});

// Loop one test case with multiple data test from JSON file
validKeyword.forEach((data) => {
  test(`Search weather with valid keyword ${data.cityName}`, async () => {
    await test.step("Go to Open Weather homepage", async () => {
      await homePage.navigateToHomePage();
      await homePage.verifyHomePageDisplayed(homePageTitle);
    });
    await test.step(`From the top menu bar, input the keyword ${data.cityName} into search box and press Enter`, async () => {
      await commonPage.searchWeatherInCityByKeyword(data.cityName);
      await searchResultPage.verifySearchResultPageDisplayed();
    });
    await test.step(`Verify city searched for is displayed in the list and matches the keyword ${data.cityName}`, async () => {
      await searchResultPage.verifyCitySearchedDisplayInResult();
    });
    await test.step(`Verify details weather page displays when user clicks on the city link`, async () => {
      await searchResultPage.clickOnCityLink();
      await detailWeatherPage.verifyDetailWeatherPageDisplayed(/.*city/);
    });
  });
});

// The purpose of this test is to verify a failing scenario. The function it tests is currently broken, and waiting to fix it
test(`Verify event is triggered search when clicking on Search button from the top menu bar`, async () => {
  await test.step("Go to Open Weather homepage", async () => {
    await homePage.navigateToHomePage();
    await homePage.verifyHomePageDisplayed(homePageTitle);
  });
  await test.step(`From the top menu bar, input the keyword ${validKeyword[0].cityName} into search box`, async () => {
    await commonPage.inputSearchKeyword(validKeyword[0].cityName);
  });
  await test.step(`Click the Search icon`, async () => {
    test.fail();
  });
  await test.step(`Verify that the search result page is displayed`, async () => {
    test.fail();
  });
});

// Auto API testing
test(`Verify Get Current Weather API returns 200 when request is sent with existing city name ${validKeyword[0].cityName}`, async ({
  baseURL,
}) => {
  const headers = {};
  const params = {
    p: "HaNoi",
  };
  const res = await homePage.callApiGetCurrentWeather(
    `${baseURL}/find`,
    headers,
    params
  );
  await homePage.verifyAPIReturnWithCurrentWeatherData(res, 200);
});
