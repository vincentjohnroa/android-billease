class FieldVerifications{

    get chromeApp(){
        return driver.$("accessibility id:Chrome");
    }




    async openChromeApp(){
        await this.chromeApp.click();
    }


}




module.exports = new LoginPage()