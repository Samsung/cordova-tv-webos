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

var GlobalizationError = require('cordova/plugin/GlobalizationError');

module.exports = {
    getPreferredLanguage: function(success, error) {
        if(typeof window.navigator.language === "string") {
            success && setTimeout(function () {
                success({
                    value: window.navigator.language
                });
            }, 0);
        }
        else {
            error && setTimeout(function () {
                error(new GlobalizationError(GlobalizationError.UNKNOWN_ERROR));
            }, 0);
        }
    },
    getLocaleName: function(success, error) {
        try {
            // Not supported on emulator.
            /*jshint undef: false */
            webOS.service.request("luna://com.webos.settingsservice", {
                method: "getSystemSettings",
                parameters: { 
                    "category": "option",
                    "keys": ["country"]
                },
                onSuccess: function (data) {
                    var countryString = data.settings.country;
                    var countryCode = "other";
                    if(typeof countryString === "string"){
                        countryCode = countryString;
                    }
                    success && setTimeout(function () {
                        success({
                            value: countryCode
                        });
                    }, 0);
                },
                onFailure: function () {
                    error && setTimeout(function () {
                        error(new GlobalizationError(GlobalizationError.UNKNOWN_ERROR));
                    }, 0);
                }
            });
        }
        catch (e) {
            error && setTimeout(function () {
                error(new GlobalizationError(GlobalizationError.UNKNOWN_ERROR));
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('Globalization', module.exports);
