import { remote } from 'webdriverio';
import { describe, it } from 'mocha';
import { ChromeScreen, LoginScreen } from '../pageObjects/elements.page.js';

const chromeScreen = new ChromeScreen();
const loginScreen = new LoginScreen();


describe('Billease Android Mobile Field Verifications', () => {
    let driver;

    before(async () => {
        const desiredCapabilities = {
            "appium:automationName": "UiAutomator2",
            "appium:platformName": "Android",
            "appium:platformVersion": "14",
            "appium:deviceName": "R5CT81BV1WT",
            "appium:newCommandTimeout": 3600,
            "appium:connectHardwareKeyboard": true
        };
        driver = await remote({
            protocol: "http",
            hostname: "192.168.100.7",
            port: 4723,
            path: "/",
            capabilities: desiredCapabilities
        });

        chromeScreen.setDriver(driver);
        loginScreen.setDriver(driver);

    });

    it('should validate Email/Mobile fields on Login screen', async () => {
        await chromeScreen.openChromeApp();
        await chromeScreen.searchForBilleaseInChrome("billease.ph");
        await chromeScreen.expandHamburgerMenuAndClickLogin();

        await loginScreen.loginWithoutInputs("Required field");
        await loginScreen.loginWithEmailInputOnly("wahucroa@gmail.com", "Required field");
        await loginScreen.loginWithPasswordInputOnly("sdasdasdasd", "Required field");
        await loginScreen.loginWithInvalidCredentials("wahucroa@gmail.com", "fdasdasdas", "Please use correct username and password.");

    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });
});
