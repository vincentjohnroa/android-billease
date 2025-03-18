import { expect } from 'expect-webdriverio';


class ChromeScreen {
    constructor() {
        this.driver = null;
    }

    setDriver(driver) {
        this.driver = driver;
    }
    
    async openChromeApp() {
        const chromeApp = await this.driver.$("accessibility id:Chrome");
        await chromeApp.click();
    }

    async searchForBilleaseInChrome(query) {
        const chromeAddressBar = await this.driver.$("id:com.android.chrome:id/url_bar");
        const billeaseLink = await this.driver.$("-android uiautomator:new UiSelector().text(\"billease.ph\").instance(0)");

        await chromeAddressBar.click();
        await chromeAddressBar.addValue(query);

        await billeaseLink.click();
    }

    async expandHamburgerMenuAndClickLogin() {
        const hamburgerMenu = await this.driver.$("class name:android.widget.Button");
        const loginButton = await this.driver.$("accessibility id:LOG IN");

        await hamburgerMenu.click();
        await loginButton.click();
    }

}


class LoginScreen {
    constructor() {
        this.driver = null;
    }

    setDriver(driver) {
        this.driver = driver;
    }
    
    async loginWithoutInputs(errorMessage) {
        const usernameInputField = await this.driver.$("id:ph.billeasev2.mobile:id/input_username");
        const mainLoginButton = await this.driver.$("id:ph.billeasev2.mobile:id/main_login");
        const loginErrorMessageContainer = await this.driver.$("id:ph.billeasev2.mobile:id/textinput_error");

        await usernameInputField.click();
        await usernameInputField.clearValue();
        await mainLoginButton.click();
        await expect(loginErrorMessageContainer).toHaveText(errorMessage);   
    }

    async loginWithEmailInputOnly(email, errorMessage) {
        const usernameInputField = await this.driver.$("id:ph.billeasev2.mobile:id/input_username");
        const mainLoginButton = await this.driver.$("id:ph.billeasev2.mobile:id/main_login");
        const loginErrorMessageContainer = await this.driver.$("id:ph.billeasev2.mobile:id/textinput_error");

        await usernameInputField.click();
        await usernameInputField.clearValue();
        await usernameInputField.addValue(email);
        await mainLoginButton.click();
        await expect(loginErrorMessageContainer).toHaveText(errorMessage);   
    }

    async loginWithPasswordInputOnly(password, errorMessage) {
        const usernameInputField = await this.driver.$("id:ph.billeasev2.mobile:id/input_username");
        const passwordInputField = await this.driver.$("id:ph.billeasev2.mobile:id/input_password");
        const mainLoginButton = await this.driver.$("id:ph.billeasev2.mobile:id/main_login");
        const loginErrorMessageContainer = await this.driver.$("id:ph.billeasev2.mobile:id/textinput_error");

        await usernameInputField.click();
        await usernameInputField.clearValue();
        await passwordInputField.addValue(password);

        await mainLoginButton.click();
        await expect(loginErrorMessageContainer).toHaveText(errorMessage);   
    }

    async loginWithInvalidCredentials(email, password, errorMessage) {
        const usernameInputField = await this.driver.$("id:ph.billeasev2.mobile:id/input_username");
        const passwordInputField = await this.driver.$("id:ph.billeasev2.mobile:id/input_password");
        const mainLoginButton = await this.driver.$("id:ph.billeasev2.mobile:id/main_login");
        const loginErrorMessageContainer = await this.driver.$("id:ph.billeasev2.mobile:id/textinput_error");

        await usernameInputField.clearValue();
        await passwordInputField.clearValue();

        await usernameInputField.addValue(email);
        await passwordInputField.addValue(password);
        

        await mainLoginButton.click();
        await expect(loginErrorMessageContainer).toHaveText(errorMessage);   
    }

    async loginWithTooManyAttempts(email, password="123") {
        const usernameInputField = await this.driver.$("id:ph.billeasev2.mobile:id/input_username");
        const passwordInputField = await this.driver.$("id:ph.billeasev2.mobile:id/input_password");
        const mainLoginButton = await this.driver.$("id:ph.billeasev2.mobile:id/main_login");
        const resetPasswordButton = await this.driver.$("id:ph.billeasev2.mobile:id/password_lock_reset");

        for (let i = 0; i < 3; i++) {
            await usernameInputField.clearValue();
            await usernameInputField.addValue(email);
            await passwordInputField.clearValue();
            await passwordInputField.addValue(password);
            await mainLoginButton.click();
        }

        await expect(resetPasswordButton).toExist();
    }

    async clickSignUpButton() {
        const signUpButton = await this.driver.$("id:ph.billeasev2.mobile:id/create_account");
        const signUpEmailInputField = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up_email_text");
        const signUpMobileInputField = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up_mobile_text");

        await signUpButton.click();
        await expect(signUpEmailInputField).toExist();
        await expect(signUpMobileInputField).toExist();
    }

    async clickForgotPasswordLink() {
        const forgotPasswordLink = await this.driver.$("id:ph.billeasev2.mobile:id/forgot_password");
        const forgotPasswordEmailField = await this.driver.$("class name:android.widget.EditText");
        const resetButton = await this.driver.$("id:ph.billeasev2.mobile:id/reset_password_reset");

        await forgotPasswordLink.click();
        await expect(forgotPasswordEmailField).toExist();
        await expect(resetButton).toExist();
    }

}


class SignUpScreen {
    constructor() {
        this.driver = null;
    }

    setDriver(driver) {
        this.driver = driver;
    }

    async signupWithoutInputs(errorMessage) {
        const signUpTermsCheckbox = await this.driver.$("id:ph.billeasev2.mobile:id/checkBox");
        const mainSignUpButton = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up");
        const signupErrorMessageContainer = await this.driver.$("id:ph.billeasev2.mobile:id/textinput_error");

        await signUpTermsCheckbox.click();
        await mainSignUpButton.click();
        await expect(signupErrorMessageContainer).toHaveText(errorMessage);
    }

    async signupWithEmailInputOnly(email, errorMessage) {
        const signUpEmailInputField = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up_email_text");
        const signUpTermsCheckbox = await this.driver.$("id:ph.billeasev2.mobile:id/checkBox");
        const mainSignUpButton = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up");
        const signupErrorMessageContainer = await this.driver.$("id:ph.billeasev2.mobile:id/textinput_error");

        await signUpEmailInputField.click();
        await signUpEmailInputField.clearValue();
        await signUpEmailInputField.addValue(email);
        await signUpTermsCheckbox.click();
        await this.driver.hideKeyboard();
        await mainSignUpButton.click();
        await expect(signupErrorMessageContainer).toHaveText(errorMessage);
    }

    async signupWithMobileInputOnly(mobile, errorMessage) {
        const signUpEmailInputField = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up_email_text");
        const signUpMobileInputField = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up_mobile_text");
        const signUpTermsCheckbox = await this.driver.$("id:ph.billeasev2.mobile:id/checkBox");
        const mainSignUpButton = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up");
        const signupErrorMessageContainer = await this.driver.$("id:ph.billeasev2.mobile:id/textinput_error");

        await signUpEmailInputField.click();
        await signUpEmailInputField.clearValue();
        await signUpMobileInputField.addValue(mobile);
        await signUpTermsCheckbox.click();
        await this.driver.hideKeyboard();
        await mainSignUpButton.click();
        await expect(signupErrorMessageContainer).toHaveText(errorMessage);
    }
    
    async signupWithoutCheckingTheCheckbox(email, mobile) {
        const signUpEmailInputField = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up_email_text");
        const signUpMobileInputField = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up_mobile_text");
        const signUpTermsCheckbox = await this.driver.$("id:ph.billeasev2.mobile:id/checkBox");
        const mainSignUpButton = await this.driver.$("id:ph.billeasev2.mobile:id/sign_up");

        await signUpEmailInputField.click();
        await signUpEmailInputField.clearValue();
        await signUpEmailInputField.addValue(email);
        await signUpMobileInputField.click();
        await signUpMobileInputField.clearValue();
        await signUpMobileInputField.addValue(mobile);
        await this.driver.hideKeyboard();
        await signUpTermsCheckbox.click();
        await mainSignUpButton.click();
        await expect(mainSignUpButton).toBeDisabled();

    }
}


class ForgotPasswordScreen {
    constructor() {
        this.driver = null;
    }

    setDriver(driver) {
        this.driver = driver;
    }

    async clickResetWithoutInputs(errorMessage) {
        const forgotPasswordEmailField = await this.driver.$("class name:android.widget.EditText");
        const forgotPasswordErrorMessageContainer = await this.driver.$("id:ph.billeasev2.mobile:id/textinput_error");
        const resetButton = await this.driver.$("id:ph.billeasev2.mobile:id/reset_password_reset");
        
        await forgotPasswordEmailField.click();
        await forgotPasswordEmailField.clearValue();
        await resetButton.click();
        await expect(forgotPasswordErrorMessageContainer).toHaveText(errorMessage);
    }

    async clickResetWithEmailInputOnly(email, errorMessage) {
        const forgotPasswordEmailField = await this.driver.$("class name:android.widget.EditText");
        const forgotPasswordErrorMessageContainer = await this.driver.$("id:ph.billeasev2.mobile:id/textinput_error");
        const resetButton = await this.driver.$("id:ph.billeasev2.mobile:id/reset_password_reset");
        
        await forgotPasswordEmailField.click();
        await forgotPasswordEmailField.clearValue();
        await forgotPasswordEmailField.addValue(email);
        await resetButton.click();
        await expect(forgotPasswordErrorMessageContainer).toHaveText(errorMessage);
    }

}


export { ChromeScreen, LoginScreen, SignUpScreen, ForgotPasswordScreen };
