#!/bin/bash

printenv
echo $BRANCH_NAME
echo "!!!"

cmd=$(cat <<EOF
echo "BRANCH_NAME: $BRANCH_NAME"
rm -rf eppsa-ksm
git clone --recursive -b $BRANCH_NAME https://github.com/artcom/eppsa-ksm.git
cd eppsa-ksm
docker-compose stop
docker-compose rm -f
docker-compose -f docker-compose.yml -f docker-compose.production.yml build
docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
EOF
)

ssh -p $SSH_PORT $SSH_USERNAME@$SSH_HOST $cmd
