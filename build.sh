#!/bin/bash

rm -rf docs
deno run --allow-read --allow-write src/build.js
deno run --allow-read --allow-write ../hippo/index.js ../nostracker/src/config.js
minirps docs
