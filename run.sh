#!/bin/bash
if [ -z $1 ]
then
    echo "No Parameter Passed..."
    echo "'local','development', 'production'"
elif [ $1 = "local" ] || [ $1 = "development" ] || [ $1 = "production" ]
then
    echo "yarn cache clean"
    yarn cache clean
    echo "yarn install --offline"
    yarn install --offline
    echo "Shut Down pm2"
    pm2 delete "GA_PORTAL_ADMIN"
    npm run $1
    echo "End"
else
    echo "Wrong parameters"
    echo "'local','development', 'production'"
fi
