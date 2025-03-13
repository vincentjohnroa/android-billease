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
    const signUpButton = await driver.$("id:ph.billeasev2.mobile:id/create_account");
    const signUpEmailInputField = await driver.$("id:ph.billeasev2.mobile:id/sign_up_email_text");
    const signUpMobileInputField = await driver.$("id:ph.billeasev2.mobile:id/sign_up_mobile_text");
    const signUpTermsCheckbox = await driver.$("id:ph.billeasev2.mobile:id/checkBox");
    const mainSignUpButton = await driver.$("id:ph.billeasev2.mobile:id/sign_up");
    const signupErrorMessageContainer = await driver.$("id:ph.billeasev2.mobile:id/textinput_error");


    await chromeApp.click();
    await chromeAddressBar.click();
    await chromeAddressBar.addValue("billease.ph");
    await billeaseLink.click();
    await hamburgerMenu.click();
    await loginButton.click();

    await signUpButton.click();

    // no inputs
    await signUpTermsCheckbox.click();
    await mainSignUpButton.click();
    await expect(signupErrorMessageContainer).toHaveText("Invalid email address");

    // email input only
    await signUpEmailInputField.click();
    await signUpEmailInputField.addValue("wahucroa@gmail.com");
    await signUpTermsCheckbox.click();
    await driver.hideKeyboard();
    await mainSignUpButton.click();
    await expect(signupErrorMessageContainer).toHaveText("Invalid number");

    // mobile number input only
    await signUpEmailInputField.click();
    await signUpEmailInputField.clearValue();
    await signUpMobileInputField.click();
    await signUpMobileInputField.addValue("09171850532");
    await driver.hideKeyboard();
    await mainSignUpButton.click();
    await expect(signupErrorMessageContainer).toHaveText("Invalid email address");

    // no checkbox
    await signUpEmailInputField.click();
    await signUpEmailInputField.addValue("wahucroa@gmail.com");
    await driver.hideKeyboard();
    await signUpTermsCheckbox.click();
    await expect(mainSignUpButton).toBeDisabled();

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

//     it('should validate redirection to signup screen and check field validation', async () => {
//         const chromeApp = await driver.$("accessibility id:Chrome");
//         const chromeAddressBar = await driver.$("id:com.android.chrome:id/url_bar");
//         const billeaseLink = await driver.$("-android uiautomator:new UiSelector().text(\"billease.ph\").instance(0)");
//         const hamburgerMenu = await driver.$("class name:android.widget.Button");
//         const loginButton = await driver.$("accessibility id:LOG IN");
//         const signUpButton = await driver.$("id:ph.billeasev2.mobile:id/create_account");
//         const signUpEmailInputField = await driver.$("id:ph.billeasev2.mobile:id/sign_up_email_text");
//         const signUpMobileInputField = await driver.$("id:ph.billeasev2.mobile:id/sign_up_mobile_text");
//         const signUpTermsCheckbox = await driver.$("id:ph.billeasev2.mobile:id/checkBox");
//         const mainSignUpButton = await driver.$("id:ph.billeasev2.mobile:id/sign_up");
//         const signupErrorMessageContainer = await driver.$("id:ph.billeasev2.mobile:id/textinput_error");

//         await chromeApp.click();
//         await chromeAddressBar.click();
//         await chromeAddressBar.addValue("billease.ph");
//         await billeaseLink.click();
//         await hamburgerMenu.click();
//         await loginButton.click();
//         await signUpButton.click();

//         // no inputs
//         await signUpTermsCheckbox.click();
//         await mainSignUpButton.click();
//         await expect(signupErrorMessageContainer).toHaveText("Invalid email address");

//         // email input only
//         await signUpEmailInputField.click();
//         await signUpEmailInputField.addValue("wahucroa@gmail.com");
//         await signUpTermsCheckbox.click();
//         await driver.hideKeyboard();
//         await mainSignUpButton.click();
//         await expect(signupErrorMessageContainer).toHaveText("Invalid number");

//         // mobile number input only
//         await signUpEmailInputField.click();
//         await signUpEmailInputField.clearValue();
//         await signUpMobileInputField.click();
//         await signUpMobileInputField.addValue("09171850532");
//         await driver.hideKeyboard();
//         await mainSignUpButton.click();
//         await expect(signupErrorMessageContainer).toHaveText("Invalid email address");

//         // no checkbox
//         await signUpEmailInputField.click();
//         await signUpEmailInputField.addValue("wahucroa@gmail.com");
//         await driver.hideKeyboard();
//         await signUpTermsCheckbox.click();
//         await expect(mainSignUpButton).toBeDisabled();
//     });

//     after(async () => {
//         if (driver) {
//             await driver.deleteSession();
//         }
//     });
// });
