var Nemo = require('nemo');
var nemo = {};
var path = require('path');
var util = require(path.resolve(__dirname, 'util'));
var assert = require('assert');

var config = {
  nemoData: {
    targetBrowser: "phantomjs",
    localServer: true,
    targetBaseUrl: "https://github.com/paypal/nemo-drivex/blob/master/README.md"
  },
  "plugins": {
    "drivex": {
      "module": path.resolve(__dirname, "../index"),
      "register": true
    }
  }
};

describe("nemo-drivex @plugin@", function () {
  before(function (done) {
    (new Nemo(config)).setup().then(function (_nemo) {
      nemo = _nemo;
      done();
    });
  });
  after(function (done) {
    nemo.driver.quit().then(util.doneSuccess(done));
  });
  it("should be available", function () {
    assert.ok(nemo.drivex);
    //return true;
  });
  //use jsdoc comments from driver methods to keep track of unit test completion
  /**
   * find wraps Selenium WebDriver/WebElement.findElement
   * @param locator {LocatorJSON}
   * @param el {WebElement}
   * @returns {Promise} resolves to WebElement or rejected
   */
  describe("@find@ method", function () {
    before(function (done) {
      nemo.driver.get(nemo.props.targetBaseUrl).
        then(util.doneSuccess(done));
    });
    it("should exist", function () {
      assert.ok(nemo.drivex.find);
    });
    it("should resolve to a web element", function (done) {
      nemo.drivex.find({locator: 'body', type: 'css'}).then(function (elt) {
        return elt.getTagName();
      }).then(function (tagName) {
        assert.equal(tagName, "body");
        done();
      });
    });
    it("should return a promise which is rejected", function (done) {
      nemo.drivex.find({locator: 'bordy', type: 'css'}).then(function (elt) {
        return elt.getTagName();
      }).then(function (tagName) {
        assert.equal(tagName, "body");
        done(new Error('shouldnt have succeeded'));
      }, util.doneSuccess(done));
    });
  });

  /**
   * finds wraps Selenium WebDriver/WebElement.findElements
   * @param locator {LocatorJSON}
   * @param el {WebElement}
   * @returns {Promise} resolves to an array of WebElements or rejected
   */
  describe("@finds@ method", function () {
    before(function (done) {
      nemo.driver.get(nemo.props.targetBaseUrl).
        then(util.doneSuccess(done));
    });
    it("should exist", function () {
      assert.ok(nemo.drivex.finds);
    });
    it("should resolve to an array of web elements", function (done) {
      nemo.drivex.finds({locator: 'h4', type: 'css'}).then(function (elts) {
        return elts[0].getTagName();
      }).then(function (tagName) {
        assert.equal(tagName, "h4");
        done();
      });
    });
    it("should return a promise which is rejected", function (done) {
      nemo.drivex.find({locator: 'bordy', type: 'css'}).then(function (elts) {
        done(new Error('shouldnt have succeeded'));
      }, util.doneSuccess(done));
    });
  });
  /**
   * present wraps Selenium WebDriver/WebElement.isElementPresent
   * @param locator {LocatorJSON}
   * @param el {WebElement}
   * @returns {Promise} resolves to true or rejected
   */
  describe("@present@ method", function () {
    it("should exist", function () {
      assert.ok(nemo.drivex.present);
    });
  });
  /**
   * visible wraps Selenium WebElement.isVisible
   * @param locator {LocatorJSON}
   * @param el {WebElement}
   * @returns {Promise} resolves to true or rejected
   */
  describe("@visible@ method", function () {
    it("should exist", function () {
      assert.ok(nemo.drivex.visible);
    });
  });
  /**
   * waitForElement Wait for timeout milliseconds for the WebElement to be present
   * @param locator {LocatorJSON}
   * @param timeout {Number}
   * @param msg {String} optional message for any error messages
   * @returns {Promise} resolves to true or false
   */
  describe("@waitForElement@ method", function () {
    before(function (done) {
      nemo.driver.get(nemo.props.targetBaseUrl).
        then(util.doneSuccess(done));
    });
    it("should exist", function () {
      assert.ok(nemo.drivex.waitForElement);
    });
    it("should return true when an element exists", function (done) {
      nemo.drivex.waitForElement({
        'locator': 'body',
        'type': 'tagName'
      }, 5000, "couldn't find body tag").then(function (found) {
        assert.equal(found, true);
        done();
      });
    });
    it("should reject promise when element doesn't exist", function (done) {
      nemo.drivex.waitForElement({
        'locator': 'bordy',
        'type': 'tagName'
      }, 1000, "couldn't find bordy tag").then(function (elt) {

        done(new Error('shouldnt have got here'));
      }, util.doneSuccess(done))
    });
  });
  /**
   * waitForElementVisible Wait for timeout milliseconds for the WebElement to be visible
   * @param locator {LocatorJSON}
   * @param timeout {Number}
   * @param msg {String} optional message for any error messages
   * @returns {Promise} resolves to true or false
   */
  describe("@waitForElementVisible@ method", function () {
    it("should be visible", function () {
      assert.ok(nemo.drivex.waitForElementVisible);
    });
    it("should return true when an element is visible", function (done) {
      var startMS;
      nemo.driver.get('https://warm-river-3624.herokuapp.com/waits');
      util.waitForJSReady(nemo).then(function() {
        startMS = Date.now();
      });
      nemo.drivex.find({locator: '#wrapper > form > input', type: 'css'}).click();
      nemo.drivex.waitForElementVisible({
        'locator': 'outy',
        'type': 'id'
      }, 6000, "couldn't find body tag").then(function (found) {
        var foundMS = Date.now() - startMS;
        assert.equal(found, true);
        assert.ok(foundMS > 4000 && foundMS < 5000);
        done();
      });
    });
    it("should reject promise when element is not visible", function (done) {
      nemo.driver.get('https://warm-river-3624.herokuapp.com/waits');
      util.waitForJSReady(nemo);
      nemo.drivex.waitForElementVisible({
        'locator': 'outy',
        'type': 'id'
      }, 6000, "couldn't find outy div visible").then(function (elt) {
        done(new Error('shouldnt have got here'));
      }, util.doneSuccess(done));
    });
  });
  /**
   * oneDisplayed determine if only one of the WebElements in the elements array is visible
   * @param elements {Array} array of WebElements
   * @returns {Promise} promise resolves to single visible element from "elements" or Error
   */
  describe("@oneDisplayed@ method", function () {
    it("should exist", function () {
      assert.ok(nemo.drivex.oneDisplayed);
    });
  });
  /**
   * allEnabled Determine if all WebElements in elements array are enabled
   * @param elements {Array} array of WebElements
   * @returns {Promise} promise resolves to true or Error
   */
  describe("@allEnabled@ method", function () {
    it("should exist", function () {
      assert.ok(nemo.drivex.allEnabled);
    });
  });
  /**
   * allDisabled Determine if all WebElements in elements array are disabled
   * @param elements {Array} array of WebElements
   * @returns {Promise} promise resolves to true or Error
   */
  describe("@allDisabled@ method", function () {
    it("should exist", function () {
      assert.ok(nemo.drivex.allDisabled);
    });
  });
  /**
   * allDisplayed Determine if all WebElements in elements array are visible
   * @param elements {Array} array of WebElements
   * @returns {Promise} promise resolves to true or Error
   */
  describe("@allDisplayed@ method", function () {
    it("should exist", function () {
      assert.ok(nemo.drivex.allDisplayed);
    });
  });
  /**
   * allHidden Determine if all WebElements in elements array are hidden
   * @param elements {Array} array of WebElements
   * @returns {Promise} promise resolves to true or Error
   */
  describe("@allHidden@ method", function () {
    it("should exist", function () {
      assert.ok(nemo.drivex.allHidden);
    });
  });

});