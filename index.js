'use strict';
var DriveX = require("./lib/drivex");

module.exports = {
	/**
	*	setup - initialize this functionality during nemo.setup
	*	@param config {Object} - full config object passed to nemo.setup(). 
	*								This plugin's config must be referenced with the same identifier 
	*								used in the setup method below
	*	@param result {Object} - result object which will eventually be passed back to the test script 
	*								once all setup methods are complete. Namespace this plugin's 
	*								functionality under it's identifier.
	*	@param callback {Function} - callback to continue the setup process. 
	*								Args are err {Error}, config {Object}, returnObj {Object}
	*/
	"setup": function(config, result, callback) {

		var returnObj = result;
		returnObj.drivex = new DriveX(result.driver, result.wd);
		callback(null, config, returnObj);

	}
};