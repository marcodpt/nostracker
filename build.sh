#!/bin/bash

if [ ! -z $1 ]; then
  rm -rf docs/clients
  rm -rf docs/relays
  rm -rf docs/libraries
  rm -rf docs/tools
fi

deno run --allow-read --allow-write --allow-net src/build.js $1
deno run --allow-read --allow-write ../hippo/index.js ../nostracker/src/config.js
#minirps docs
