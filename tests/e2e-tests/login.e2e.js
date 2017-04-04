describe('Login:', function() {

  let loginTitle = "Ionic App";
  let homeTitle = "Home";

  let u = "username";
  let p = "password";
  let i = "input";
  let l = "login";

    beforeEach(function() {
      browser.get('http://localhost:8100');
    });


    it('should have correct title', function() {
        expect(browser.getTitle()).toEqual(loginTitle);
    });


    it('should log in with correct usr/pwd', function() {
      // Enter username
      var usr = element.all(by.name(u)).first().all(by.tagName(i)).first();
      usr.sendKeys("HVL");

      // Enter password
      var pwd = element.all(by.name(p)).first().all(by.tagName(i)).first();
      pwd.sendKeys("ncRvOMpNLICQ4WJw");

      // Click login
      var button = element(by.name(l));
      button.click();

      expect(browser.getTitle()).toEqual(homeTitle);
    });


    it('should not log in with wrong pwd', function() {
      // Enter correct username
      var usr = element.all(by.name(u)).first().all(by.tagName(i)).first();
      usr.sendKeys('HVL');

      // Enter wrong password
      var pwd = element.all(by.name(p)).first().all(by.tagName(i)).first();
      pwd.sendKeys("WRONG");

      // Click login
      var button = element(by.name(l));
      button.click();

      expect(browser.getTitle()).toEqual(loginTitle);
    });


    it('should not log in with wrong usr', function() {
      // Enter wrong username
      var usr = element.all(by.name(u)).first().all(by.tagName(i)).first();
      usr.sendKeys('WRONG');

      // Enter correct password
      var pwd = element.all(by.name(p)).first().all(by.tagName(i)).first();
      pwd.sendKeys("ncRvOMpNLICQ4WJw");

      // Click login
      var button = element(by.name(l));
      button.click();

      expect(browser.getTitle()).toEqual(loginTitle);
    });


    it('should not log in with no input', function() {
      // Click login
      var button = element(by.name(l));
      button.click();

      expect(browser.getTitle()).toEqual(loginTitle);
    });



});
