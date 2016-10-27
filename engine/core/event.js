(function() {

    // Based on https://github.com/daniellmb/MinPubSub
    GameEngine.Event = (function() {

        var subscriberCache = {};

        return {

            KEY_UP: 'GameEngine.input.keyup',

            KEY_DOWN: 'GameEngine.input.keydown',

            publish: function(channel, parameters) {
                var subscribers     = subscriberCache[channel];
                var subscriberCount = subscribers ? subscribers.length : 0;

                while (subscriberCount--) {
                    subscribers[subscriberCount].apply(window, parameters || []);
                }
            },

            subscribe: function(topic, callback) {
                if (!subscriberCache[topic]) {
                    subscriberCache[topic] = [];
                }

                subscriberCache[topic].push(callback);
                return {
                    topic:    topic,
                    callback: callback
                };
            },

            unsubscribe: function(handle) {
                var subscribers     = subscriberCache[handle.topic];
                var callback        = handle.callback;
                var subscriberCount = subscribers ? subscribers.length : 0;

                while(subscriberCount--) {
                    if (subscribers[subscriberCount] === callback) {
                        subscribers.splice(subscriberCount, 1);
                    }
                }
            }
        };
    })();

})();
