#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

sudo kill -9 `pgrep python`

echo "Flask server stopped."
