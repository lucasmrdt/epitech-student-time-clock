#!/usr/bin/env bash

IFS=
ENV_FILE=".env"
IP_ENV_FORMAT="IP=%s\n"
PRIVATE_IP=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')

NEW_ENV_VARIABLE=$(printf $IP_ENV_FORMAT $PRIVATE_IP)

if [ ! -f $ENV_FILE ]; then
  echo $NEW_ENV_VARIABLE > $ENV_FILE
elif [ $(grep -Eo 'IP=' $ENV_FILE) ]; then
  NEW_ENV_FILE=$(sed "s/IP=.*/$NEW_ENV_VARIABLE/" $ENV_FILE)
  echo $NEW_ENV_FILE > $ENV_FILE
else
  echo $NEW_ENV_VARIABLE >> $ENV_FILE
fi

echo "✅ '.env' file is ready !"