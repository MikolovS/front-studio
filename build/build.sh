#!/bin/bash

SCRIPT_PATH="`dirname \"$0\"`"              # relative
SCRIPT_PATH="`( cd \"$SCRIPT_PATH\" && pwd )`"  # absolutized and normalized

if [ -z "$SCRIPT_PATH" ] ; then
  # error; for some reason, the path is not accessible
  # to the script (e.g. permissions re-evaled after suid)
  exit 1  # fail
fi

docker run --rm --interactive --tty -v "$SCRIPT_PATH/..":/app -w /app node npm install
docker run --rm --interactive --tty -v "$SCRIPT_PATH/..":/app -w /app node npm run build


printf "PROJECT_DIR=$SCRIPT_PATH/.." > "$SCRIPT_PATH/.env"


cd "$SCRIPT_PATH" && \
	docker-compose build
