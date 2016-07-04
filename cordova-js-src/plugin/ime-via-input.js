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

var elInput;
document.body.addEventListener('keydown', function(e) {

    elInput = null;

    if(document.activeElement && document.activeElement.tagName.toUpperCase() === 'INPUT' &&
        (document.activeElement.type === 'text' || document.activeElement.type === 'password')) {
        var event = document.createEvent('Event');
        console.log("what is keycode : " + e.keyCode);
        switch(e.keyCode) {
            case 13: // Done
                elInput = document.activeElement;
                event.initEvent('submit', true, true);
                elInput.dispatchEvent(event);
                elInput.setAttribute('data-ime-show', 'false');
                elInput.blur();
                break;
            case 40: // Cancel
                elInput = document.activeElement;
                event.initEvent('cancel', true, true);
                elInput.dispatchEvent(event);
                elInput.setAttribute('data-ime-show', 'false');
                elInput.value = '';
                elInput.blur();
                break;
        }
    }
});

document.body.addEventListener('focus', function (e) {
    if(document.activeElement && document.activeElement.tagName.toUpperCase() === 'INPUT' && (document.activeElement.type === 'text' || document.activeElement.type === 'password')) {
        document.activeElement.setAttribute('data-ime-show', 'true');
    }
}, true);
