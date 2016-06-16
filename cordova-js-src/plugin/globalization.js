// Retrieved from: https://github.com/apache/cordova-plugin-globalization/blob/master/www/globalization.js
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var globalization = {

    /**
     * Returns the string identifier for the client's current language.
     * It returns the language identifier string to the successCB callback with a
     * properties object as a parameter. If there is an error getting the language,
     * then the errorCB callback is invoked.
     *
     * @param {Function} successCB
     * @param {Function} errorCB
     *
     * @return Object.value {String}: The language identifier
     *
     * @error GlobalizationError.UNKNOWN_ERROR
     *
     * Example
     *    globalization.getPreferredLanguage(function (language) {alert('language:' + language.value + '\n');},
     *                                function () {});
     */
    getPreferredLanguage: function(successCB, failureCB) {
        argscheck.checkArgs('fF', 'Globalization.getPreferredLanguage', arguments);
        exec(successCB, failureCB, 'Globalization', 'getPreferredLanguage', []);
    },

    /**
     * Returns the string identifier for the client's current locale setting.
     * It returns the locale identifier string to the successCB callback with a
     * properties object as a parameter. If there is an error getting the locale,
     * then the errorCB callback is invoked.
     *
     * @param {Function} successCB
     * @param {Function} errorCB
     *
     * @return Object.value {String}: The locale identifier
     *
     * @error GlobalizationError.UNKNOWN_ERROR
     *
     * Example
     *    globalization.getLocaleName(function (locale) {alert('locale:' + locale.value + '\n');},
     *                                function () {});
     */
    getLocaleName: function(successCB, failureCB) {
        argscheck.checkArgs('fF', 'Globalization.getLocaleName', arguments);
        exec(successCB, failureCB, 'Globalization', 'getLocaleName', []);
    }
};

module.exports = globalization;
