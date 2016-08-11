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

var WebosActiveConnectionType = {
    WIRED: 'wired',
    WIFI: 'wifi',
    NONE: 'none',
    UNKNOWN: 'unknown'
};

var WebosConnectionState = {
    OFFLINE: 'disconnected',
    ONLINE: 'connected'
};

function parseNetworkState(data) {
    if(data.wired.state == WebosConnectionState.ONLINE) {
        return WebosActiveConnectionType.WIRED;
    }
    else if (data.wifi.state == WebosConnectionState.ONLINE) {
        return WebosActiveConnectionType.WIFI;
    }
    else if((data.wan.state == WebosConnectionState.ONLINE) || (data.wifiDirect.state == WebosConnectionState.ONLINE)) {
        return WebosActiveConnectionType.UNKNOWN;
    }
    return WebosActiveConnectionType.NONE;
}

var isFirstTime = false;
var networkType = '';

window.addEventListener('online', function (e) {
    if(isFirstTime === false) {
        e.stopImmediatePropagation();
        /*jshint undef: false */
        webOS.service.request('luna://com.palm.connectionmanager', {
            method: 'getStatus',
            onSuccess: function (data) {
                var activeType = parseNetworkState(data);
                switch(activeType) {
                case WebosActiveConnectionType.NONE:
                    console.log('network disconnected');
                    networkType = Connection.NONE;
                    break;
                case WebosActiveConnectionType.WIFI:
                    console.log('connection network type is Wifi');
                    networkType = Connection.WIFI;
                    break;
                case WebosActiveConnectionType.WIRED:
                    console.log('connection network type is Ethernet');
                    networkType = Connection.ETHERNET;
                    break;
                default:
                    console.log('connection network type is Unknown');
                    networkType = Connection.UNKNOWN;
                    break;
                }
                if(navigator.connection) {
                    navigator.connection.type = networkType;
                    isFirstTime = true;
                    var networkEvent = document.createEvent('Event');
                    networkEvent.initEvent('online', true, true);
                    window.dispatchEvent(networkEvent);
                }
            },
            onFailure: function (e) {
                throw e;
            }
        });
    }
    else {
        isFirstTime = false;
    }
});

window.addEventListener('offline', function () {
    networkType = Connection.NONE;

    if(navigator.connection) {
        navigator.connection.type = networkType;
    }
});

module.exports = {
    getConnectionInfo: function(successCallback, errorCallback) {
        var networkType = Connection.NONE;
        try {
            /*jshint undef: false */
            webOS.service.request('luna://com.palm.connectionmanager', {
                method: 'getStatus',
                onSuccess: function (data) {
                    var activeType = parseNetworkState(data);
                    switch(activeType) {
                    case WebosActiveConnectionType.NONE:
                        console.log('network disconnected');
                        networkType = Connection.NONE;
                        break;
                    case WebosActiveConnectionType.WIFI:
                        console.log('connection network type is Wifi');
                        networkType = Connection.WIFI;
                        break;
                    case WebosActiveConnectionType.WIRED:
                        console.log('connection network type is Ethernet');
                        networkType = Connection.ETHERNET;
                        break;
                    default:
                        console.log('connection network type is Unknown');
                        networkType = Connection.UNKNOWN;
                        break;
                    }

                    setTimeout(function() {
                        successCallback(networkType);
                    }, 0);
                },
                onFailure: function (e) {
                    throw e;
                }
            });
        }
        catch (e) {
            setTimeout(function() {
                errorCallback(e);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('NetworkStatus', module.exports);
