var drivex = require("../index");
var nemo = {
	"driver": true,
	"wd": true
};
describe("nemo-drivex setup method", function () {
	it("should return", function (done) {
		drivex.setup(nemo, function (err) {
			if (nemo.drivex) {
				done();
			} else if (err) {
				done(err);
			} else {
				done(new Error("Didn't get drivex object back"));
			}
		})
	});
});
