
describe('Home', function () {
    let button, pwd, usr, menu;
    let u = "username";
    let p = "password";
    let i = "input";
    let l = "login";
    let m = "menuToggle";

    let loginTitle = "Login";
    let homeTitle = "Home";
    let reportTitle = "Generate Report";
    let diaryTitle = "Pain Diary";
    let haqTitle = "eHAQ overview";
    let guideTitle = "User Guide";
    let settingsTitle = "Settings";

    beforeEach(function () {
        browser.get('http://localhost:8100');

        // if user is not logged in, the user needs to login first
        // if (browser.getTitle() == login) { // adding disease 

        usr = element.all(by.name(u)).first().all(by.tagName(i)).first();
        usr.sendKeys("Alex");

        // Enter password
        pwd = element.all(by.name(p)).first().all(by.tagName(i)).first();
        pwd.sendKeys("WXOxuAAewkd4unhl");

        // Click login
        button = element(by.name(l));
        button.click();
        //  }
    });

    it('should have correct title', function () {
        browser.sleep(500);
        expect(browser.getTitle() == homeTitle);
    }); 

    it('should give access to eHAQ overview', function () {
        menu = element(by.id(m));
        menu.click();
        browser.sleep(1500);
        button = element.all(by.className('menubutton')).get(3);
        button.click();
        browser.sleep(700);
        expect(browser.getTitle()).toEqual(haqTitle);
    });

    it('should give access to painDiary overview', function () {
        menu = element(by.id(m));
        menu.click();
        browser.sleep(1500);
        button = element.all(by.className('menubutton')).get(2);
        button.click();
        browser.sleep(700);
        expect(browser.getTitle()).toEqual(diaryTitle);
    });

    it('should give access to Report page', function () {
        menu = element(by.id(m));
        menu.click();
        browser.sleep(1500);
        button = element.all(by.className('menubutton')).get(1);
        button.click();
        browser.sleep(700);
        expect(browser.getTitle()).toEqual(reportTitle);
    });
   
   
    it('should give access to user guide', function () {
        menu =""; 
        menu = element(by.id(m));
        menu.click();
        browser.sleep(1500);
        button = element.all(by.className('menubutton')).get(6);
        button.click();
        browser.sleep(700);
        expect(browser.getTitle()).toEqual(guideTitle);
    }); 


    it('should give access to settings', function () {
        menu = element(by.id(m));
        menu.click();
        browser.sleep(1500);
        button = element.all(by.className('menubutton')).get(7);
        button.click();
        browser.sleep(700);
        expect(browser.getTitle()).toEqual(settingsTitle);
    });

    it('should go to pain diary overview when button: pain diary are pressed', function () {
        button = element(by.id("painButton"));
        button.click();
        browser.sleep(1500);
        expect(browser.getTitle()).toEqual(diaryTitle);
    });

    it('should go to generate report when button: generate report are pressed', function () {
        button = element(by.id("reportButton"));
        button.click();
        browser.sleep(1500);
        expect(browser.getTitle()).toEqual(reportTitle);
    });
    
    it('should logout of the app', function () {
        menu = element(by.id(m));
        menu.click();
        browser.sleep(1500);
        button = element.all(by.className('menubutton')).get(8);
        button.click();
        browser.sleep(1700);
        expect(browser.getTitle()).toEqual('Login');
       
    }); 
    
    it('should show the pain diary graph, and not the eHAQ graph', function () {
        expect(element(by.id("graph1")).isPresent()).toBe(true);
        expect(element(by.id("graph2")).isPresent()).toBe(false);

    });
    it('should show the eHAQ graph, when pressing eHAQ segment button', function () {
        button = element(by.id("segmentbutton2"));
        button.click();
        browser.sleep(1700);
        expect(element(by.id("graph1")).isPresent()).toBe(false);
        expect(element(by.id("graph2")).isPresent()).toBe(true);

    });
}); 