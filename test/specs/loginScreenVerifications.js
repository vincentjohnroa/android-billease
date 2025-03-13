import {remote} from 'webdriverio';
import { expect } from 'expect-webdriverio'


async function main () {
  const desired_capabilities = {
      "appium:automationName": "UiAutomator2",
      "appium:platformName": "Android",
      "appium:platformVersion": "14",
      "appium:deviceName": "R5CT81BV1WT",
      "appium:newCommandTimeout": 3600,
      "appium:connectHardwareKeyboard": true
  }
  const driver = await remote({
      protocol: "http",
      hostname: "192.168.100.7",
      port: 4723,
      path: "/",
      capabilities: desired_capabilities
  });

    const chromeApp = await driver.$("accessibility id:Chrome");
    const chromeAddressBar = await driver.$("id:com.android.chrome:id/url_bar");
    const billeaseLink = await driver.$("-android uiautomator:new UiSelector().text(\"billease.ph\").instance(0)");
    const hamburgerMenu = await driver.$("class name:android.widget.Button");
    const loginButton = await driver.$("accessibility id:LOG IN");
    const usernameInputField = await driver.$("id:ph.billeasev2.mobile:id/input_username");
    const mainLoginButton = await driver.$("id:ph.billeasev2.mobile:id/main_login");
    const loginErrorMessageContainer = await driver.$("id:ph.billeasev2.mobile:id/textinput_error");
    const passwordInputField = await driver.$("id:ph.billeasev2.mobile:id/input_password");


    await chromeApp.click();
    await chromeAddressBar.click();
    await chromeAddressBar.addValue("billease.ph");
    await billeaseLink.click();
    await hamburgerMenu.click();
    await loginButton.click();


    // no inputs
    await usernameInputField.click();
    await usernameInputField.clearValue();
    await mainLoginButton.click();
    await expect(loginErrorMessageContainer).toHaveText("Required field");

    // email input only
    await usernameInputField.click();
    await usernameInputField.clearValue();
    await usernameInputField.click();
    await usernameInputField.addValue("wahucroa@gmail.com");
    await mainLoginButton.click();
    await expect(loginErrorMessageContainer).toHaveText("Required field");

    // password input only
    await usernameInputField.click();
    await usernameInputField.clearValue();
    await passwordInputField.click();
    await passwordInputField.addValue("testpassword");
    await mainLoginButton.click();
    await expect(loginErrorMessageContainer).toHaveText("Required field");

    // wrong email or password
    await usernameInputField.click();
    await usernameInputField.addValue("wahucroa@gmail.com");
    await mainLoginButton.click();
    await expect(loginErrorMessageContainer).toHaveText("Please use correct username and password.");

    await driver.deleteSession();
}

main().catch(console.log);



// trying to put it in describe and it block
// import { remote } from 'webdriverio';
// import { expect } from 'expect-webdriverio';
// import { describe, it, before, after } from 'mocha';

// describe('Billease Android Mobile Field Verifications', () => {
//     let driver;

//     before(async () => {
//         const desiredCapabilities = {
//             "appium:automationName": "UiAutomator2",
//             "appium:platformName": "Android",
//             "appium:platformVersion": "14",
//             "appium:deviceName": "R5CT81BV1WT",
//             "appium:newCommandTimeout": 3600,
//             "appium:connectHardwareKeyboard": true
//         };
//         driver = await remote({
//             protocol: "http",
//             hostname: "192.168.100.7",
//             port: 4723,
//             path: "/",
//             capabilities: desiredCapabilities
//         });
//     });

//     it('should validate Email/Mobile fields on Login screen', async () => {
//         const chromeApp = await driver.$("accessibility id:Chrome");
//         const chromeAddressBar = await driver.$("id:com.android.chrome:id/url_bar");
//         const billeaseLink = await driver.$("-android uiautomator:new UiSelector().text(\"billease.ph\").instance(0)");
//         const hamburgerMenu = await driver.$("class name:android.widget.Button");
//         const loginButton = await driver.$("accessibility id:LOG IN");
//         const usernameInputField = await driver.$("id:ph.billeasev2.mobile:id/input_username");
//         const mainLoginButton = await driver.$("id:ph.billeasev2.mobile:id/main_login");
//         const loginErrorMessageContainer = await driver.$("id:ph.billeasev2.mobile:id/textinput_error");
//         const passwordInputField = await driver.$("id:ph.billeasev2.mobile:id/input_password");

//         await chromeApp.click();
//         await chromeAddressBar.click();
//         await chromeAddressBar.addValue("billease.ph");
//         await billeaseLink.click();
//         await hamburgerMenu.click();
//         await loginButton.click();

//         // no inputs
//         await usernameInputField.click();
//         await usernameInputField.clearValue();
//         await mainLoginButton.click();
//         await expect(loginErrorMessageContainer).toHaveText("Required field");

//         // email input only
//         await usernameInputField.click();
//         await usernameInputField.clearValue();
//         await usernameInputField.click();
//         await usernameInputField.addValue("wahucroa@gmail.com");
//         await mainLoginButton.click();
//         await expect(loginErrorMessageContainer).toHaveText("Required field");

//         // password input only
//         await usernameInputField.click();
//         await usernameInputField.clearValue();
//         await passwordInputField.click();
//         await passwordInputField.addValue("testpassword");
//         await mainLoginButton.click();
//         await expect(loginErrorMessageContainer).toHaveText("Required field");

//         // wrong email or password
//         await usernameInputField.click();
//         await usernameInputField.addValue("wahucroa@gmail.com");
//         await mainLoginButton.click();
//         await expect(loginErrorMessageContainer).toHaveText("Please use correct username and password.");
//     });

//     after(async () => {
//         if (driver) {
//             await driver.deleteSession();
//         }
//     });
// });
