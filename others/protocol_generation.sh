#!/bin/sh

# Install dependencies
cd ../application
npm install
cd ../others

# First, generate the C implementation for Arduino (backend)
protoc --nanopb_out=../controller/src/server --proto_path=../protocols/ armwar.proto

# Then, generate the js implementaiton (frontend)
./../application/node_modules/protobufjs-cli/bin/pbjs -t static-module -w es6 -o ../application/src/scripts/protocol/armwar.js ../protocols/armwar.proto
