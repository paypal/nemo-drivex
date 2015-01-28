var Nemo = require('nemo');
var nemo = {};
var path = require('path');
var assert = require('assert');

var config = {
  nemoData: {
    targetBrowser: "chrome",
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
  before(function(done) {
    (new Nemo(config)).setup().then(function(_nemo) {
      nemo = _nemo;
      nemo.driver.get(nemo.props.targetBaseUrl).
        then(function() {
          done();
        });
    });
  });
  after(function(done) {
     nemo.driver.quit().then(function() {
       done();
     });
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
  describe("@find@ method", function() {
    it("should exist", function () {
      assert.ok(nemo.drivex.find);
    });
  });

  /**
   * finds wraps Selenium WebDriver/WebElement.findElements
   * @param locator {LocatorJSON}
   * @param el {WebElement}
   * @returns {Promise} resolves to an array of WebElements or rejected
   */
  describe("@finds@ method", function() {
    it("should exist", function () {
      assert.ok(nemo.drivex.finds);
    });
  });
  /**
   * present wraps Selenium WebDriver/WebElement.isElementPresent
   * @param locator {LocatorJSON}
   * @param el {WebElement}
   * @returns {Promise} resolves to true or rejected
   */
  describe("@present@ method", function() {
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
  describe("@visible@ method", function() {
    it("should exist", function () {
      assert.ok(nemo.drivex.visible);
    });
  });
  /**
   * waitForElement Wait for timeout milliseconds for the WebElement to be present
   * @param locator {LocatorJSON}
   * @param timeout {Number}
   * @param msg {String} optional message for any error messages
   * @returns {Promise} resolves to true or rejected
   */
  describe("@waitForElement@ method", function() {
    it("should exist", function () {
      assert.ok(nemo.drivex.waitForElement);
    });
  });
  /**
   * oneDisplayed determine if only one of the WebElements in the elements array is visible
   * @param elements {Array} array of WebElements
   * @returns {Promise} promise resolves to single visible element from "elements" or Error
   */
  describe("@oneDisplayed@ method", function() {
    it("should exist", function () {
      assert.ok(nemo.drivex.oneDisplayed);
    });
  });
  /**
   * allEnabled Determine if all WebElements in elements array are enabled
   * @param elements {Array} array of WebElements
   * @returns {Promise} promise resolves to true or Error
   */
  describe("@allEnabled@ method", function() {
    it("should exist", function () {
      assert.ok(nemo.drivex.allEnabled);
    });
  });
  /**
   * allDisabled Determine if all WebElements in elements array are disabled
   * @param elements {Array} array of WebElements
   * @returns {Promise} promise resolves to true or Error
   */
  describe("@allDisabled@ method", function() {
    it("should exist", function () {
      assert.ok(nemo.drivex.allDisabled);
    });
  });
  /**
   * allDisplayed Determine if all WebElements in elements array are visible
   * @param elements {Array} array of WebElements
   * @returns {Promise} promise resolves to true or Error
   */
  describe("@allDisplayed@ method", function() {
    it("should exist", function () {
      assert.ok(nemo.drivex.allDisplayed);
    });
  });
  /**
   * allHidden Determine if all WebElements in elements array are hidden
   * @param elements {Array} array of WebElements
   * @returns {Promise} promise resolves to true or Error
   */
  describe("@allHidden@ method", function() {
    it("should exist", function () {
      assert.ok(nemo.drivex.allHidden);
    });
  });
});