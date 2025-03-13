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
  const accountLockedErrorMessage = await driver.$("id:ph.billeasev2.mobile:id/password_lock_title");
  const resetPasswordButton = await driver.$("id:ph.billeasev2.mobile:id/password_lock_reset");


  await chromeApp.click();
  await chromeAddressBar.click();
  await chromeAddressBar.addValue("billease.ph");
  await billeaseLink.click();
  await hamburgerMenu.click();
  await loginButton.click();

  // too many attempts
  while (true) {
    await mainLoginButton.click();
    
    try {
        await expect(accountLockedErrorMessage).toHaveText("Account locked for 10 minutes", { timeout: 1000 });
        break;
    } catch (error) {

    }
  }
  
  await expect(resetPasswordButton).toBeDisplayed();

  
  await browser.closeWindow();
  await driver.deleteSession();
}

main().catch(console.log);
