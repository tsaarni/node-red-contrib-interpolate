var Piecewise = require('piecewise-function')

module.exports = function(RED) {
    function InterpolateNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            var x = [];
            var y = [];
            config.points.forEach(function(elem) {
                x.push(parseFloat(elem.x));
                y.push(parseFloat(elem.y));
            });
            f = Piecewise(x, y);

            var input = RED.util.evaluateNodeProperty(config.inputField, config.inputFieldType, node, msg);
            RED.util.setMessageProperty(msg, config.inputField, f(input));

            node.send(msg);
        });
    }
    RED.nodes.registerType("interpolate", InterpolateNode);
}
