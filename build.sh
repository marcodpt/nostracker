#!/bin/bash

deno run --allow-read --allow-write --allow-net src/build.js $1
deno run --allow-read --allow-write ../hippo/index.js ../nostracker/src/config.js
#minirps docs
