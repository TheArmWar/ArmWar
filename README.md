# ArmWar

## Commit

Before commiting, please run `pre-commit install -t pre-commit -t commit-msg` to install the pre-commit hooks.

## Application

This project is a simple web application that allows to demonstrate how the application should communicate with the controller.

### Dependencies

- node
- npm

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```

## Controller

This project aims to build an ESP32 DO IT DEVKIT program that receives instructions from the ArmWar application and controlls the Arm.

### Project setup

To be able to compile and flash the controller, you will need to install and setup up several dependencies.

- Arduino IDE
- Adafruit PWM Servo Driver Library [v3.0.1]
- ESP32_HTTPS_Server
- Nanopb

#### Arduino IDE

Start by installing the last version of **Arduino IDE**. The way you install it is not important. Simply make sure that you have access to the libraries directory.
Depending on the way you installed the IDE, the **libraries** directory should be located at: ~/Arduino/libraries.  
Set the card type to `DOIT ESP32 DEVKIT V1`.

#### ESP32_HTTPS_Server

This library is used to instantiate an HTTP server. Because of new versions of **ESP32** development package of **Arduino IDE**. This library do not compile anymore. There is a simple fix that
consists of modifying the file **HTTPConnection.hpp** located at **"~/Arduino/libraries/ESP32_HTTPS_Server/src"**. Replace line **9** by the following one.

> #include <sha/sha_parallel_engine.h>

Now, the library should compile without errors.

#### Nanopb

You have to install Nanopb from https://jpa.kapsi.fi/nanopb/download/. Select the latest linux version. Then, untar the downloaded directory where ever you want. Once this is done, create a new directory called **Nanopb** inside the libraries directory of Arduino IDE. Then, the following files should appear on the untar directory:

- pb.h
- pb_common.h
- pb_common.c
- pb_encode.h
- pb_encode.c
- pb_decode.h
- pb_decode.c

Copy all these files in the directory you've just created.
Then, you should add the generator-bin directory of the untar directory to your **PATH**.

### Wifi Setup

To be able to connect to wifi with the arm, you must create a "credentials.hpp"
file which contains your credentials. An example is provided, simply copy it and
replace the values with yours.

### Documentation

#### Code

TLDR: **Only document what is necessary**, the code should be self-explanatory.

We're using [Robert C. Martin's Clean Code](https://github.com/martinmurciego/good-books/blob/master/Clean%20Code_%20A%20Handbook%20of%20Agile%20Software%20Craftsmanship%20-%20Robert%20C.%20Martin.pdf) as a reference for our code.
Code should be self-explanatory and comments should be used **only when necessary**.\
This is why for the moment we're documentating **only the function, classes, enums...** with the [Doxygen](https://www.doxygen.nl/index.html) syntax for the cpp/hpp files.\
For the frontend files we're using the [JSDoc](https://jsdoc.app/) syntax only when necessary.

#### Project

The readme acts as the main documentation for the project, and as such should be as complete as possible.
A detail documentation/explanation of the frontend will be added in the future.

### Versioning

We're using [Semantic Versioning](https://semver.org/) for our versioning.
We'll be using the following format for our versioning: `MAJOR.MINOR.PATCH`.

- `MAJOR` version when you make incompatible API changes
- `MINOR` version when you add functionality in a backwards compatible manner
- `PATCH` version when you make backwards compatible bug fixes

### Release

The realease will be done using [Github Releases](https://docs.github.com/en/github/administering-a-repository/managing-releases-in-a-repository).
For the extension we will be using the tar.gz format.
