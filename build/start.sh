#!/bin/bash


SCRIPT_PATH="`dirname \"$0\"`"              # relative
SCRIPT_PATH="`( cd \"$SCRIPT_PATH\" && pwd )`"  # absolutized and normalized

cd "$SCRIPT_PATH" && \
	docker-compose up -d