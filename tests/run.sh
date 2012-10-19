#!/bin/bash
function check {
  if [ "$?" $1 "0" ]; then
    exit 1
  fi
}
mocha --reporter spec $1 $2 $3 $4
check -ne
