//import * as _authService from '../../security/auth.service';
//import * as matchers from 'jasmine-jquery-matchers';
var matchers = require('jasmine-jquery-matchers');

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
      jasmine.addMatchers(matchers);

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

    it('should be in Pain Diary Page', function() {
      expect(browser.getTitle()).toEqual(diaryTitle);
    });


    it('should be able to create new task correctly', function() {
      let length1, length2;

      // Check number of inputs first
      element.all(by.className("card")).then(function(items) {
        length1 = items.length;
      });

      button = element(by.id('addButton'));
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(painEntryTitle);

      // Adding values
      el = element(by.id("painInput"));
      el.click();
      el = element(by.id("diseaseInput"));
      el.click();
      el = element(by.id("fatigueInput"));
      el.click();

      // Should navigate back to diary
      button = element(by.id("ok"));
      button.click();
      browser.sleep(700);
      expect(browser.getTitle()).toEqual(diaryTitle);

      // Check new number of inputs
      element.all(by.className("card")).then(function(items) {
        length2 = items.length;
        expect(length2).toBe(length1 + 1);
      });

    });

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



    it('should not delete when hitting cancel', function() {
      let length1, length2;
      element.all(by.className("card")).then(function(items) {
        length1 = items.length;
      });

      button = element.all(by.className("deleteButton")).get(0);
      button.click();

      button = element.all(by.className("alert-button")).get(0);
      browser.sleep(700);
      button.click();

      element.all(by.className("card")).then(function(items){
        length2 = items.length;
        expect(length2).toBe(length1);
      });
    });


    it('should delete when hitting OK', function() {
      let length1, length2;
      element.all(by.className("card")).then(function(items) {
        length1 = items.length;
      });

      button = element.all(by.className("deleteButton")).get(0);
      button.click();

      button = element.all(by.className("alert-button")).get(1);
      browser.sleep(700);
      button.click();
      browser.sleep(1000);

      element.all(by.className("card")).then(function(items){
        length2 = items.length;
        expect(length2).toBe(length1 - 1);
      });
    });
/*
    it('should extend/compress pain entry', function() {

      el = element.all(by.className("extraInfo")).get(0);
      //expect(el.style.display).toEqual('none');


      button = element.all(by.className("extendToggle")).get(0);
      button.click();
      browser.sleep(700);

      el = element.all(by.className("extraInfo")).get(0);
      expect(el).toBeVisible();



    });
*/

});
