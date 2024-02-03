# ArmWar

## Commit

Before commiting, please run `pre-commit install -t pre-commit -t commit-msg` to install the pre-commit hooks.

## Application

This project is a simple web application that communicates with the controller backend to move the Arm.

### Dependencies

- node 20.0.0
- npm 9.6.4

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

### Project Setup

#### Arduino IDE

To be able to compile and flash the controller, you will need to install the last version of **Arduino IDE**. The way you install is not important.
Simply make sure that you have access to the libraries directory.
Depending on the way you installed the IDE, the **libraries** directory should be located at: ~/Arduino/libraries.

#### Arduino IDE Libraries

The controller uses the following arduino libraries:

- Adafruit PWM Servo Driver Library [v3.0.1]
- Adafruit BusIO [v1.15.0]
- ESP32_HTTPS_Server [v1.0.0]

You can install those libraries from the library manager of Arduino IDE

#### ESP32_HTTPS_Server

You may encounter an issue while trying to compile the project. This compilation error may come from the ESP32_HTTPS_Server library.

Try to use the following fix if you encounter the issue:

Modify the file **HTTPConnection.hpp** located at **"~/Arduino/libraries/ESP32_HTTPS_Server/src"**. **Replace** line **9** by the following one.

> #include <sha/sha_parallel_engine.h>

This library is used to instantiate an HTTP server. Because of new versions of **ESP32** development package of **Arduino IDE**. This library do not compile anymore.

#### Wifi Setup

To be able to connect to wifi with the arm, you must create a "credentials.hpp"
file which contains your credentials in the **config** directory.

An example is provided in the **examples** directory, simply copy it and replace the values with yours.

## Protocol

ArmWar is using protobuff to generate its communication protocol. This protocol
is a way to format data as Json does. The protocol definition is located in a
simple .proto file in the **protocols** directory. With this .proto file, we can
generate code for different language to be able to serialize and deserialize data.

### Controller protocol code

To generate the controller code, you have to install Nanopb from https://jpa.kapsi.fi/nanopb/download/.
Select the latest linux version. Then, untar the downloaded directory where ever you want. Once this is done, you
should add the generator-bin directory of the untar directory to your **PATH**.

> Nanopb is a lightweight implementation of protobuff for C language.

### Application protocol code

The application uses an npm library of protobuff. This library allows to generate
static code for the protocol. (This library is installed when you run npm install)

### Generator script

We wrote a simple script that generates at the right place the code of our
protocol for both application and controller.
(You must have Nanopb and protobuff from npm installed)

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
