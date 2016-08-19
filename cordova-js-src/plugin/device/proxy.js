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

var webos = require('cordova/platform');

module.exports = {
    getDeviceInfo: function(successCallback, errorCallback) {

        var modelInfo = null;
        var firmwareInfo = null;
        var duidInfo = null;

        var isDuidLoaded = false;
        var isSystemidLoaded = false;

        var callSuccess = function() {
            if(isDuidLoaded && isSystemidLoaded) {
                setTimeout(function() {
                    successCallback({
                        cordova: webos.cordovaVersion,
                        platform: 'tv-webos',
                        model: modelInfo, // 'WEBOS1'
                        version: firmwareInfo, // '3.00.00'
                        uuid: duidInfo, // '095f142a-xxxx-ac5d-xxxx-92c8be18xxxx'
                        manufacturer: 'LG Webos TV'
                    });
                }, 0);
            }
        };

        /*jshint undef: false */
        webOS.service.request('luna://com.webos.service.sm', {
            method: 'deviceid/getIDs',
            parameters: {
                'idType': ['LGUDID']
            },
            onSuccess: function (inResponse) {
                duidInfo = inResponse.idList[0].idValue;
                isDuidLoaded = true;
                callSuccess();

            },
            onFailure: function (inError) {
                isDuidLoaded = true;
                callSuccess();
            }
        });

        /*jshint undef: false */
        webOS.service.request('luna://com.webos.service.tv.systemproperty', {
            method: 'getSystemInfo',
            parameters: {
                'keys': ['modelName', 'firmwareVersion']
            },
            onComplete: function (inResponse) {
                var isSucceeded = inResponse.returnValue;
                if (isSucceeded) {
                    modelInfo = inResponse.modelName;
                    firmwareInfo = inResponse.firmwareVersion;
                }
                isSystemidLoaded = true;
                callSuccess();
            }
        });
    }
};

require('cordova/exec/proxy').add('Device', module.exports);
