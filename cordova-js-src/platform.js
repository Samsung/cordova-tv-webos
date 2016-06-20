/*
 * Copyright 2015 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
    id: 'tv-webos',
    cordovaVersion: '3.4.0',

    bootstrap: function() {
        console.log('cordova/platform: webos bootstrap BEGIN');

        var modulemapper = require('cordova/modulemapper');
        var channel = require('cordova/channel');

        modulemapper.clobbers('cordova/exec/proxy', 'cordova.commandProxy');

        for (var k in define.moduleMap) {
            if (/cordova.*\/proxy/.exec(k)) {
                require(k);
            }
            if (/cordova.*\/symbols/.exec(k)) {
                require(k);
            }
        }

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'webOSjs-0.1.0/webOS.js';
        script.onload = function() {
            channel.onNativeReady.fire();
        };
        head.appendChild(script);

        var hidden, visibilityChange;

        // For the backward compatibility
        if (typeof document.hidden !== 'undefined') {
            hidden = 'hidden';
            visibilityChange = 'visibilitychange';
        }
        else if (typeof document.webkitHidden !== 'undefined') {
            hidden = 'webkitHidden';
            visibilityChange = 'webkitvisibilitychange';
        }

        document.addEventListener(visibilityChange, function() {
            if (document[hidden]) {
                channel.onPause.fire();
            }
            else {
                channel.onResume.fire();
            }
        }, false);

        window.addEventListener('load', function () {
            channel.onDeviceReady.fire();
        });

        // End of bootstrap
        console.log('cordova/platform: tizen bootstrap END');
    }
};
