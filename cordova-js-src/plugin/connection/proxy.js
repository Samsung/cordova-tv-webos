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

var Connection = require('cordova/plugin/Connection');

module.exports = {
    getConnectionInfo: function(successCallback, errorCallback) {
        var networkType = Connection.NONE;

        window.addEventListener('online', function (e) {
            checkNetworkType();

            if(navigator.connection) {
                navigator.connection.type = networkType;
            }
        });
        window.addEventListener('offline', function (e) {
            networkType = Connection.NONE;

            if(navigator.connection) {
                navigator.connection.type = networkType;
            }
        });

        getActiveConnectionType(successCallback, errorCallback);

        function checkNetworkType() {
            webOS.service.request("luna://com.webos.service.connectionmanager", {
                method: "getStatus",
                onSuccess: function (data) {
                    var activeType = parseNetworkState(data);
                    switch(activeType) {
                    case "NONE":
                        console.log('network disconnected');
                        networkType = Connection.NONE;
                        break;
                    case "WIFI":
                        console.log('connection network type is Wifi');
                        networkType = Connection.WIFI;
                        break;
                    case "ETHERNET":
                        console.log('connection network type is Ethernet');
                        networkType = Connection.ETHERNET;
                        break;
                    default:
                        console.log('connection network type is Unknown');
                        networkType = Connection.UNKNOWN;
                        break;
                    }
                },
                onFailure: function (error) {
                    console.log("Failed to get network state");
                    console.log("[" + error.errorCode + "]: " + error.errorText);
                    // throw error;
                    return;
                }
            });
        }

        function parseNetworkState(data) {
            if(data.wired.state == "connected"){
                return "ETHERNET";
            } else if (data.wifi.state == "connected"){
                return "WIFI";
            } else if((data.wan.state == "connected") || (data.wifiDirect.state == "connected")) {
                return "UNKNOWN";
            } else{
                "NONE";
            }

            if(!data.isInternetConnectionAvailable){
                return "NONE";
            }

            return "NONE";
        }

        function getActiveConnectionType(successCB, errorCB) {
            try {
                checkNetworkType();
                setTimeout(function() {
                    if(navigator.connection) {
                        navigator.connection.type = networkType;
                    }
                    successCB(networkType);
                }, 0);
            }
            catch (e) {
                networkType = Connection.NONE;
                setTimeout(function() {
                    if(navigator.connection) {
                        navigator.connection.type = networkType;
                    }
                    successCB(networkType);
                }, 0);
            }
        }
    }
};

require('cordova/exec/proxy').add('NetworkStatus', module.exports);
