import { remote } from 'webdriverio';
import { describe, it } from 'mocha';
import { ChromeScreen, LoginScreen, SignUpScreen, ForgotPasswordScreen } from '../pageObjects/elements.page.js';

const chromeScreen = new ChromeScreen();
const loginScreen = new LoginScreen();
const signupScreen = new SignUpScreen();
const forgotpasswordScreen = new ForgotPasswordScreen();


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
        signupScreen.setDriver(driver);
        forgotpasswordScreen.setDriver(driver);

    });

    it('should validate Email/Mobile fields on forgot password screen', async () => {
        await chromeScreen.openChromeApp();
        await chromeScreen.searchForBilleaseInChrome("billease.ph");
        await chromeScreen.expandHamburgerMenuAndClickLogin();
        await loginScreen.clickForgotPasswordLink();

        await forgotpasswordScreen.clickResetWithoutInputs("Please enter a valid email or mobile number.");
        await forgotpasswordScreen.clickResetWithEmailInputOnly("wahucroa@@gmail.com", "Please enter a valid email or mobile number.");

    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });
});
