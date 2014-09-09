/*───────────────────────────────────────────────────────────────────────────*\
│  Copyright (C) 2014 eBay Software Foundation                                │
│                                                                             │
│                                                                             │
│   Licensed under the Apache License, Version 2.0 (the "License"); you may   │
│   not use this file except in compliance with the License. You may obtain   │
│   a copy of the License at http://www.apache.org/licenses/LICENSE-2.0       │
│                                                                             │
│   Unless required by applicable law or agreed to in writing, software       │
│   distributed under the License is distributed on an "AS IS" BASIS,         │
│   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
│   See the License for the specific language governing permissions and       │
│   limitations under the License.                                            │
\*───────────────────────────────────────────────────────────────────────────*/
"use strict";
var async = require("async");

/**
 *
 * @param driver Selenium WebDriver instance
 * @param wd static webdriver object
 * @constructor
 */
function DriveX(driver, wd) {

	this.driver = driver;
	this.wd = wd;
}

DriveX.prototype = {
	/**
	 * wraps Selenium WebDriver/WebElement.findElement
	 * @param locator {LocatorJSON}
	 * @param el {WebElement}
	 * @returns {Promise} resolves to WebElement or rejected
	 */
	find: function (locator, el) {
		return (el ? el : this.driver).findElement(this.by(locator));
	},
	/**
	 * wraps Selenium WebDriver/WebElement.findElements
	 * @param locator {LocatorJSON}
	 * @param el {WebElement}
	 * @returns {Promise} resolves to an array of WebElements or rejected
	 */
	finds: function (locator, el) {
		return (el ? el : this.driver).findElements(this.by(locator));
	},
	/**
	 * wraps Selenium WebDriver/WebElement.isElementPresent
	 * @param locator {LocatorJSON}
	 * @param el {WebElement}
	 * @returns {Promise} resolves to true or rejected
	 */
	present: function (locator, el) {
		return (el ? el : this.driver).isElementPresent(this.by(locator));
	},
	/**
	 * wraps Selenium WebElement.isVisible
	 * @param locator {LocatorJSON}
	 * @param el {WebElement}
	 * @returns {Promise} resolves to true or rejected
	 */
	visible: function (locator, el) {
		var self = this;
		return (el ? el : this.driver).isElementPresent(this.by(locator)).then(function(isPresent) {
			if (isPresent) {
				return self.find(locator, el).then(function(elt) {
					return elt.isDisplayed();
				})
			} else {
				return false;
			}
		});
	},
	/**
	 * Wait for timeout milliseconds for the WebElement to be present
	 * @param locator {LocatorJSON}
	 * @param timeout {Number}
	 * @param msg {String} optional message for any error messages
	 * @returns {Promise} resolves to true or rejected
	 */
	waitForElement: function (locator, timeout, msg) {
		var that = this;
		return this.driver.wait(function () {
			return that.present(locator);
		}, timeout, msg).then(function(finalReturn) {
			return finalReturn;
		}, function(err) {
			return false;
		});
	},
	/**
	 * determine if only one of the WebElements in the elements array is visible
	 * @param elements {Array} array of WebElements
	 * @returns {Promise} promise resolves to single visible element from "elements" or Error
	 */
	oneDisplayed: function (elements) {
		var length = elements.length,
			current = 0,
			displayedElt = null,
			returnError = new Error("[drivex.oneDisplayed] Didn't find any displayed elements"),
			d = this.wd.promise.defer();
		if (!length) {
			d.reject(new Error("[drivex.oneDisplayed] No WebElements passed in"));
		}
		async.whilst(function () {
			return current < length;
		}, function (callback) {
			elements[current].isDisplayed().
				then(function (disp) {
					if (disp && displayedElt === null) {
						displayedElt = elements[current];
						returnError = null;
					} else if (disp && displayedElt !== null) {
						returnError = new Error("[drivex.oneDisplayed] Found more than one displayed element");
					}
					current++;
					callback(returnError);
				})
		}, function (err) {
			if (err) {
				d.reject(err);
			} else {
				d.fulfill(displayedElt);
			}
		});
		return d.promise;
	},
	/**
	 * Determine if all WebElements in elements array are enabled
	 * @param elements {Array} array of WebElements
	 * @returns {Promise} promise resolves to true or Error
	 */
	allEnabled: function (elements) {
		var length = elements.length,
			current = 0,
			returnError = null,
			d = this.wd.promise.defer();
		if (!length) {
			d.reject(new Error("[drivex.allEnabled] No WebElements passed in"));
		}
		async.whilst(function () {
			return current < length;
		}, function (callback) {
			elements[current].isEnabled().
				then(function (enabled) {
					if (!enabled) {
						returnError = new Error("[drivex.allEnabled] All elements not enabled");
					}
					callback(returnError);
					current++;
				})
		}, function (err) {
			if (err) {
				d.reject(err);
			} else {
				d.fulfill(true);
			}
		});
		return d.promise;
	},
	/**
	 * Determine if all WebElements in elements array are disabled
	 * @param elements {Array} array of WebElements
	 * @returns {Promise} promise resolves to true or Error
	 */
	allDisabled: function (elements) {
		var length = elements.length,
			current = 0,
			returnError = null,
			d = this.wd.promise.defer();
		if (!length) {
			d.reject(new Error("[drivex.allDisabled] No WebElements passed in"));
		}
		async.whilst(function () {
			return current < length;
		}, function (callback) {
			elements[current].isEnabled().
				then(function (enabled) {
					if (enabled) {
						returnError = new Error("[drivex.allDisabled] All elements not disabled");
					}
					callback(returnError);
					current++;
				})
		}, function (err) {
			if (err) {
				d.reject(err);
			} else {
				d.fulfill(true);
			}
		});
		return d.promise;
	},
	/**
	 * Determine if all WebElements in elements array are visible
	 * @param elements {Array} array of WebElements
	 * @returns {Promise} promise resolves to true or Error
	 */
	allDisplayed: function (elements) {
		var length = elements.length,
			current = 0,
			returnError = null,
			d = this.wd.promise.defer();
		if (!length) {
			d.reject(new Error("[drivex.allDisplayed] No WebElements passed in"));
		}
		async.whilst(function () {
			return current < length;
		}, function (callback) {
			//console.log("allDisplayed, current", current);
			elements[current].isDisplayed().
				then(function (displayed) {
					//console.log("displayed",displayed);
					if (!displayed) {
						returnError = new Error("[drivex.allDisplayed] All elements not displayed");
					}

					current++;
					callback(returnError);
				})
		}, function (err) {
			if (err) {
				d.reject(err);
			} else {
				d.fulfill(true);
			}
		});
		return d.promise;
	},
	/**
	 * Determine if all WebElements in elements array are hidden
	 * @param elements {Array} array of WebElements
	 * @returns {Promise} promise resolves to true or Error
	 */
	allHidden: function (elements) {
		var length = elements.length,
			current = 0,
			returnError = null,
			d = this.wd.promise.defer();
		if (!length) {
			d.reject(new Error("[drivex.allHidden] No WebElements passed in"));
		}
		async.whilst(function () {
			return current < length;
		}, function (callback) {
			elements[current].isDisplayed().
				then(function (displayed) {
					if (displayed) {
						returnError = new Error("[drivex.allHidden] All elements not hidden");
					}
					current++;
					callback(returnError);

				})
		}, function (err) {
			if (err) {
				d.reject(err);
			} else {
				d.fulfill(true);
			}
		});
		return d.promise;
	},
	/**
	 * wraps Selenium WebDriver "by" method for identifying the locator strategy. This should be moved to be private
	 * @param locator {Object}
	 * @returns {Promise} returns WebDriver.Locator
	 */
	by: function (locator) {
		return this.wd.By[locator.type](locator.locator);
	}
};
/**
 *
 * @module DriveX
 */
module.exports = DriveX;

//JSDOC stuff
/**
 * @typedef LocatorJSON
 * @type {object}
 * @property {string} locator - a locator string, such as "[value='US']" or "#countrySelect"
 * @property {string} type - corresponds to one of the Selenium Locator strategies (id, name, xpath, css)
 */
