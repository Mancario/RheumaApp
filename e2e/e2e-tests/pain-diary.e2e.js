//import * as _authService from '../../security/auth.service';


describe('Pain Diary:', function() {


  let diaryTitle = "Pain Diary";
  let painEntryTitle = "New Entry";

  let u = "username";
  let p = "password";
  let i = "input";
  let l = "login";
  let m = "menuToggle";

  let button, pwd, usr, menu, el;

    beforeEach(function() {
      browser.get('http://localhost:8100');
      browser.sleep(700);

/*
      if(browser.getTitle() == homeTitle){
        menu = element(by.id(m));
        menu.click();
        browser.sleep(500);
        button = element.all(by.className('menubutton')).get(8);
        button.click();
        browser.sleep(700);
      } */

      // Enter username
      usr = element.all(by.name(u)).first().all(by.tagName(i)).first();
      usr.sendKeys("HVL");

      // Enter password
      pwd = element.all(by.name(p)).first().all(by.tagName(i)).first();
      pwd.sendKeys("ncRvOMpNLICQ4WJw");

      // Click login - Go to Home screen
      button = element(by.name(l));
      button.click();

      // Navigate to PainDiary
      menu = element(by.id(m));
      menu.click();
      browser.sleep(500);
      button = element.all(by.className('menubutton')).get(2);
      button.click();
      browser.sleep(700);

    });
/*
    it('should be in Pain Diary Page', function() {
      expect(browser.getTitle()).toEqual(diaryTitle);
    });
*/

    it('should display at least one card with information', function() {
      el = element.all(by.className("card")).get(0);

      expect(el).toBeDefined();

      button = element.all(by.className("painButton")).get(0);
      expect(button).toBeDefined();

      button = element.all(by.className("diseaseButton")).get(0);
      expect(button).toBeDefined();

      button = element.all(by.className("fatigueButton")).get(0);
      expect(button).toBeDefined();

      button = element.all(by.className("prednisoloneButton")).get(0);
      expect(button).toBeDefined();

      el = element.all(by.className("otherMeds")).get(0);
      expect(el).toBeDefined();

      el = element.all(by.className("tenderJoints")).get(0);
      expect(el).toBeDefined();

      el = element.all(by.className("comments")).get(0);
      expect(el).toBeDefined();

    });




});
