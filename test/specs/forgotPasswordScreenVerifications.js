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
    const forgotPasswordLink = await driver.$("id:ph.billeasev2.mobile:id/forgot_password");
    const forgotPasswordEmailField = await driver.$("class name:android.widget.EditText");
    const forgotPasswordErrorMessageContainer = await driver.$("id:ph.billeasev2.mobile:id/textinput_error");
    const resetButton = await driver.$("id:ph.billeasev2.mobile:id/reset_password_reset");


    await chromeApp.click();
    await chromeAddressBar.click();
    await chromeAddressBar.addValue("billease.ph");
    await billeaseLink.click();
    await hamburgerMenu.click();
    await loginButton.click();

    await forgotPasswordLink.click();
  
    // no inputs
    await forgotPasswordEmailField.click();
    await forgotPasswordEmailField.clearValue();
    await expect(forgotPasswordErrorMessageContainer).toHaveText("Please enter a valid email or mobile number.");

    // email input only
    await forgotPasswordEmailField.click();
    await forgotPasswordEmailField.addValue("wahucroa@@gmail.com");
    await resetButton.click();
    await expect(forgotPasswordErrorMessageContainer).toHaveText("Please enter a valid email or mobile number.");

    await driver.deleteSession();
}

main().catch(console.log);
