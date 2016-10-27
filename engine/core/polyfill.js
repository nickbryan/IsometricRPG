(function() {
    if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];

        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame  = window[vendors[i] + 'CancelAnimationFrame'] ||
                window[vendors[i] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame && !!window.setTimeout) {
            window.requestAnimationFrame = function(callback) {
                var currentTime = Date.now();
                var timeToCall = Math.max(0, 16 - (currentTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currentTime + timeToCall);
                }, timeToCall);
                lastTime = currentTime - timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame && !!window.clearTimeout) {
            window.cancelAnimationFrame = function(id) {
                window.clearTimeout(id);
            };
        }
    }
})();

(function() {
    if (!window.performance) {
        window.performance = {};
    }

    if (!window.performance.now) {
        var start = Date.now();
        window.performance.now = function() {
            return Date.now() - start;
        };
    }
})();