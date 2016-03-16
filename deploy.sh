#!/bin/bash

echo "Deploying App To Meteor Galaxy"

DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy girlcode.q42.com --settings settings.json

echo "Deploy Finished"
