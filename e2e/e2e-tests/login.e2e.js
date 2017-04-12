//import * as _authService from '../../security/auth.service';


describe('Login:', function() {

  let loginTitle = "Login";
  let homeTitle = "Home";
  let reportTitle = "Generate Report";
  let diaryTitle = "Pain Diary";
  let painEntryTitle = "New Entry";
  let haqTitle = "eHAQ overview";
  let haqEntryTitle = "New eHAQ";
  let dasTitle = "eDAS";
  let bloodTitle = "Blood Test";
  let guideTitle = "User Guide";
  let settingsTitle = "Settings";

  let u = "username";
  let p = "password";
  let i = "input";
  let l = "login";
  let m = "menuToggle";

  let button, pwd, usr, menu;

    beforeEach(function() {
      browser.get('http://localhost:8100');
      browser.sleep(700);

      if(browser.getTitle() == homeTitle){
        menu = element(by.id(m));
        menu.click();
        browser.sleep(500);
        button = element.all(by.className('menubutton')).get(8);
        button.click();
        browser.sleep(700);
      }


    });


    it('should have correct title', function() {
        expect(browser.getTitle()).toEqual(loginTitle);
    });


    it('should log in with correct usr/pwd', function() {
      // Enter username
      usr = element.all(by.name(u)).first().all(by.tagName(i)).first();
      usr.sendKeys("HVL");

      // Enter password
      pwd = element.all(by.name(p)).first().all(by.tagName(i)).first();
      pwd.sendKeys("ncRvOMpNLICQ4WJw");

      // Click login
      button = element(by.name(l));
      button.click();

      expect(browser.getTitle()).toEqual(homeTitle);
    });


    it('should not log in with wrong pwd', function() {
      // Enter correct username
      usr = element.all(by.name(u)).first().all(by.tagName(i)).first();
      usr.sendKeys('HVL');

      // Enter wrong password
      pwd = element.all(by.name(p)).first().all(by.tagName(i)).first();
      pwd.sendKeys("WRONG");

      // Click login
      button = element(by.name(l));
      button.click();

      expect(browser.getTitle()).toEqual(loginTitle);
    });


    it('should not log in with wrong usr', function() {
      // Enter wrong username
      usr = element.all(by.name(u)).first().all(by.tagName(i)).first();
      usr.sendKeys('WRONG');

      // Enter correct password
      pwd = element.all(by.name(p)).first().all(by.tagName(i)).first();
      pwd.sendKeys("ncRvOMpNLICQ4WJw");

      // Click login
      button = element(by.name(l));
      button.click();

      expect(browser.getTitle()).toEqual(loginTitle);
    });


    it('should not log in with no input', function() {
      // Click login
      button = element(by.name(l));
      button.click();

      expect(browser.getTitle()).toEqual(loginTitle);
    });


    it('should give access to all pages with login', function() {
      // Enter username
      usr = element.all(by.name(u)).first().all(by.tagName(i)).first();
      usr.sendKeys("HVL");

      // Enter password
      pwd = element.all(by.name(p)).first().all(by.tagName(i)).first();
      pwd.sendKeys("ncRvOMpNLICQ4WJw");

      // Click login - Go to Home screen
      button = element(by.name(l));
      button.click();
      expect(browser.getTitle()).toEqual(homeTitle);

      // Navigate to ReportPage
      menu = element(by.id(m));
      menu.click();
      browser.sleep(500);
      button = element.all(by.className('menubutton')).get(1);
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(reportTitle);


      // Navigate to PainDiary
      menu = element(by.id(m));
      menu.click();
      browser.sleep(500);
      button = element.all(by.className('menubutton')).get(2);
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(diaryTitle);

      // Navigate to New Diary entry
      button = element(by.id('addButton'));
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(painEntryTitle);

      // Navigate to eHAQ
      menu = element(by.id(m));
      menu.click();
      browser.sleep(500);
      button = element.all(by.className('menubutton')).get(3);
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(haqTitle);

      // Navigate to eHAQ entry
      button = element(by.id('addButton'));
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(haqEntryTitle);

      // Navigate to eDAS
      menu = element(by.id(m));
      menu.click();
      browser.sleep(500);
      button = element.all(by.className('menubutton')).get(4);
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(dasTitle);

      // Navigate to Blood Test
      menu = element(by.id(m));
      menu.click();
      browser.sleep(500);
      button = element.all(by.className('menubutton')).get(5);
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(bloodTitle);

      // Navigate to User Guide
      menu = element(by.id(m));
      menu.click();
      browser.sleep(500);
      button = element.all(by.className('menubutton')).get(6);
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(guideTitle);

      // Navigate to Settings
      menu = element(by.id(m));
      menu.click();
      browser.sleep(500);
      button = element.all(by.className('menubutton')).get(7);
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(settingsTitle);

    });

});
