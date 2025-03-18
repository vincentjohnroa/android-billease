# android-billease

Android Automation using Appium

With installed Billease mobile app, open Chrome mobile browser and click login button from this page https://billease.ph/

Once you got redirected to mobile app, test login screen with the following cases:
- Email/Mobile field validation on Login screen

- Redirection to signup screen and check field validation

- Redirection to Forgot Password screen and check field validation

Installation/Pre-requisites:
1. JAVA_HOME in your environment variables path (system variables)
2. ANDROID_HOME in your environment variables path (system variables)
3. Nodejs
4. Appium (for server purposes)
5. Appium Inspector (for getting locators on a real device)
6. WebdriverIO (framework for scripting on javascript for mobile automation)
   - make sure to get necessary dependencies during setup
7. You can also use appium doctor ro check for missing/needed setup for android automation
![image](https://github.com/user-attachments/assets/cb64af66-cd78-4601-83b6-5a5d110a8bfe)

8. Setup your desired capabilities in Appium Inspector
   
How to run scripts:
1. Clone this repo via HTTPS
2. Open this repository using your IDE
3. Start appium server in your command prompt by running "appium" command
4. Open Appium Inspector and select desired capabilities the click Start Session" (make sure that the host and port is from the appium server that you spun up)
5. In your IDE or cmd (make sure you are in the project directory) run command "npx mocha <relative-path-of-your-script> --timeout 60000
