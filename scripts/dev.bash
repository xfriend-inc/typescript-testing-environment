#!/bin/bash
npx ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/index.ts