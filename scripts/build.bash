#!/bin/bash
npx babel src --extensions ".js,.ts" --out-dir build --ignore '**/*.spec.ts' --source-maps inline