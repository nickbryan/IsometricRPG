(function() {

    GameEngine.Loader = (function() {

        var loadedImages = {};

        var loadedJSONFiles = {};

        var resourceCount = 0;

        function loadImage(resource, onLoadSuccess, onLoadError) {
            loadedImages[resource.name] = new Image();
            loadedImages[resource.name].onload = onLoadSuccess;
            loadedImages[resource.name].onerror = onLoadError;
            loadedImages[resource.name].src = resource.src;
        }

        function loadJSONFile(resource, onLoadSuccess, onLoadError) {
            var xhr = new XMLHttpRequest();

            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }

            // TODO: enable nocache
            xhr.open("GET", resource.src, true);

            xhr.ontimeout = onLoadError;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    // TODO: test this
                    // status = 0 when file protocol is used, or cross-domain origin,
                    // (With Chrome use "--allow-file-access-from-files --disable-web-security")
                    if ((xhr.status === 200) || ((xhr.status === 0) && xhr.responseText)) {
                        loadedJSONFiles[resource.name] = JSON.parse(xhr.responseText);
                        onLoadSuccess();
                    }
                    else {
                        onLoadError();
                    }
                }
            };

            xhr.send(null);
        }


        return {

            loadResource: function(resource, onLoadSuccess, onLoadError) {
                switch (resource.type) {
                    case 'json':
                        //TODO: loadJSONFile.call()?
                        loadJSONFile(resource, onLoadSuccess, onLoadError);

                        return true;

                    case 'image':
                        loadImage(resource, onLoadSuccess, onLoadError);

                        return true;
                    default:
                        throw new Error("Unknown resource type " + resource.type + ".");
                }
            },

            getJSONResource: function(resourceName) {
                resourceName = "" + resourceName;

                if (resourceName in loadedJSONFiles) {
                    return loadedJSONFiles[resourceName];
                }

                return null;
            },

            getImage: function(imageName) {
                imageName = "" + imageName;

                if (imageName in loadedImages) {
                    return loadedImages[imageName];
                }

                return null;
            }

        };

    })();

})();