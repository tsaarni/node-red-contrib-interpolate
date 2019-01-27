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
            var output = f(input);
            var minClamp = config.minClamp ? parseFloat(config.minClamp) : -Infinity;
            var maxClamp = config.maxClamp ? parseFloat(config.maxClamp) : Infinity;
            RED.util.setMessageProperty(msg, config.inputField, Math.min(Math.max(minClamp, output), maxClamp));

            node.send(msg);
        });
    }
    RED.nodes.registerType("interpolate", InterpolateNode);
}
