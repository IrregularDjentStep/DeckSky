#!/usr/bin/env bash
CLI_LOCATION="$(pwd)/cli"
echo "Building plugin in $(pwd)"
echo "1687" | sudo -S $CLI_LOCATION/decky plugin build $(pwd)
#printf "Please input sudo password to proceed.\n"

# read -s sudopass

# printf "\n"

#echo $sudopass | sudo -E $CLI_LOCATION/decky plugin build $(pwd)
