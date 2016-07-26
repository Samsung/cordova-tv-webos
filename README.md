[![Build Status](https://travis-ci.org/Samsung/cordova-tv-webos.svg?branch=master)](https://travis-ci.org/Samsung/cordova-tv-webos)

# cordova-tv-webos
`cordova-tv-webos` is an TV application library that allows for Cordova-based projects to be built for the WebOS TV Platform.
Cordova based applications are, at the core, applications written with web technology: HTML, CSS and JavaScript.

# Supported Platform
* LG WebOS TV

# Project Structure
```
    ./
     |-cordova-js-src/ .... cordova-js tv-webos platform implementation
     |  |-plugin/ ......... cordova plugin implementations
     |  |-exec.js ......... cordova/exec module
     |  `-platform.js ..... cordova/platform module having platform definition and bootstrap
     |-www/ ............... Project template for WebOS platform
     |-package.json ....... npm package configuration
     '-README.md .......... this file
```

# How to Build
This section describes the build process which creates `cordova.js` file for the `tv-webos` cordova platform.
Please see [Cordova-js](http://github.com/apache/cordova-js) for more detail of `compile` task.

1. Clone the [Cordova-js](http://github.com/apache/cordova-js) project as sibling of this project.
    ```sh
    $ git clone https://github.com/Samsung/cordova-tv-webos.git
    $ git clone https://github.com/apache/cordova-js.git
    ```
    
    Repositories will be created like below directory structure.
    ```
    ./
     |-cordova-js
     `-cordova-tv-webos
    ```

2. Add "tv-webos" as a target of "compile" task on `Gruntfile.js` in the cordova-js project.
    ```js
    ...
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "compile": {
            ...,
            "tv-webos": {}
        },
        "compile-browserify": {
        ...
    });
    ```

3. Add "tv-webos" property to "cordova-platforms" object in the cordova-js project's `package.json` with path to this project's repository as its value.
    ```JSON
    "cordova-platforms": {
        ...,
        "cordova-tv-webps": "../cordova-tv-webos"
    }
    ```

4. In the `cordova-js` directory's root, run below command to create `cordova-js/pkg/cordova.tv-webos.js` file.
    ```sh
    $ grunt compile:tv-webos
    ```

5. We recommend to copy the created file to the `www` directory which is including WebOS Application project templates for further use. In the `cordova-js` directory:
    ```sh
    $ cp ./pkg/cordova.tv-webos.js ../cordova-tv-webos/www/cordova.js
    ```

# How to use
For creating application package for WebOS TV:

1. Create a WebOS project with WebOS IDE and copy the `www` directory's content to the WebOS project.
2. Copy the built `cordova-js/pkg/cordova.tv-webos.js` to your WebOS project directory's root with name `cordova.js`.
3. Build the WebOS project.

* We recommand to use the [grunt-cordova-sectv](http://github.com/Samsung/grunt-cordova-sectv) Grunt task to automate these process.

# Known Issues
Not yet
