#!/bin/bash

if [ ! -z $1 ]; then
  rm -rf docs/clients
  rm -rf docs/relays
  rm -rf docs/libraries
  rm -rf docs/tools
  rm -rf docs/informations
fi

deno run -RWN src/build.js $1
deno run -RW ../hippo/index.js ../nostracker/src/config.js
#minirps docs
