var should = require("should");
var helper = require("node-red-node-test-helper");
var heatNode = require("../interpolate.js");

helper.init(require.resolve('node-red'));

describe('interpolate node', function() {


    before(function(done) {
        helper.startServer(done);
    });

    it('should be loaded', function (done) {
        console.log(helper.url());

        var flow = [{ id: "n1", type: "interpolate", name: "test name" }];
        helper.load(heatNode, flow, function () {
          var n1 = helper.getNode("n1");
          n1.should.have.property('name', 'test name');
          done();
        });
      });



})
