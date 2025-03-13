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
    const passwordInputField = await driver.$("id:ph.billeasev2.mobile:id/input_password");
    const resetPasswordButton = await driver.$("id:ph.billeasev2.mobile:id/password_lock_reset");


    await chromeApp.click();
    await chromeAddressBar.click();
    await chromeAddressBar.addValue("billease.ph");
    await billeaseLink.click();
    await hamburgerMenu.click();
    await loginButton.click();

    for (let i = 0; i < 3; i++) {
        await usernameInputField.clearValue();
        await usernameInputField.addValue("wahucroa@gmail.com");
        await passwordInputField.clearValue();
        await passwordInputField.addValue("asafsdfsdfasd");
        await mainLoginButton.click();
    }

    await expect(resetPasswordButton).toExist();

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

//     it('should verify locked accounts', async () => {
//         const chromeApp = await driver.$("accessibility id:Chrome");
//         const chromeAddressBar = await driver.$("id:com.android.chrome:id/url_bar");
//         const billeaseLink = await driver.$("-android uiautomator:new UiSelector().text(\"billease.ph\").instance(0)");
//         const hamburgerMenu = await driver.$("class name:android.widget.Button");
//         const loginButton = await driver.$("accessibility id:LOG IN");
//         const usernameInputField = await driver.$("id:ph.billeasev2.mobile:id/input_username");
//         const mainLoginButton = await driver.$("id:ph.billeasev2.mobile:id/main_login");
//         const passwordInputField = await driver.$("id:ph.billeasev2.mobile:id/input_password");
//         const resetPasswordButton = await driver.$("id:ph.billeasev2.mobile:id/password_lock_reset");

//         await chromeApp.click();
//         await chromeAddressBar.click();
//         await chromeAddressBar.addValue("billease.ph");
//         await billeaseLink.click();
//         await hamburgerMenu.click();
//         await loginButton.click();

//         for (let i = 0; i < 3; i++) {
//             await usernameInputField.clearValue();
//             await usernameInputField.addValue("wahucroa@gmail.com");
//             await passwordInputField.clearValue();
//             await passwordInputField.addValue("asafsdfsdfasd");
//             await mainLoginButton.click();
//         }

//         await expect(resetPasswordButton).toBeDisplayed();
//     });

//     after(async () => {
//         if (driver) {
//             await driver.deleteSession();
//         }
//     });
// });
