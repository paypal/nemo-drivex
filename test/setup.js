var NemoDriveX = require("../index");
var returnObj = {
	"driver": true,
	"wd": true
};
describe("nemo-drivex setup method", function () {
	it("should return", function (done) {
		NemoDriveX.setup({}, returnObj, function (err, config, returnObj) {
			if (returnObj.drivex) {
				//console.log("user", returnObj.user);
				done()
			} else if (err) {
				done(err)
			} else {
				done(new Error("Didn't get drivex object back"))
			}
		})
	});
});