#!/bin/bash


# GITHUB_REF: refs/heads/<branch_name>, refs/tags/<tag_name>
if [ ! -z $GITHUB_REF ]; then
    TRIGGER_TYPE=$(echo $GITHUB_REF | cut -d '/' -f2)
    NAME=$(echo $GITHUB_REF | cut -d '/' -f3-)

    if [ $TRIGGER_TYPE = "heads" ]; then
        if [ $NAME = "master" ]; then
            export DOCKER_TAG=prod
            export CACHE_DOCKER_TAG=prod
            export VUE_APP_API_MODE=production
            export VUE_APP_FIREBASE_CONFIG=$FIREBASE_CONFIG_PROD
            export VUE_APP_FIREBASE_VAPID_KEY=$FIREBASE_VAPID_KEY_PROD
            export VUE_APP_CHANNEL_PLUGIN_KEY=$CHANNEL_PLUGIN_KEY
        else
            # Docker tag에 /가 들어갈 수 없어서 -로 변경
            export DOCKER_TAG=$(echo $NAME | sed -e "s/\//-/g")
            export CACHE_DOCKER_TAG=dev
            export VUE_APP_API_MODE=development
            export VUE_APP_FIREBASE_CONFIG=$FIREBASE_CONFIG_DEV
            export VUE_APP_FIREBASE_VAPID_KEY=$FIREBASE_VAPID_KEY_DEV
            export VUE_APP_CHANNEL_PLUGIN_KEY=$CHANNEL_PLUGIN_KEY
        fi
    elif [ $TRIGGER_TYPE = "tags" ]; then
        export DOCKER_TAG=$NAME
        export CACHE_DOCKER_TAG=prod
        export VUE_APP_API_MODE=production
        export VUE_APP_FIREBASE_CONFIG=$FIREBASE_CONFIG_PROD
        export VUE_APP_FIREBASE_VAPID_KEY=$FIREBASE_VAPID_KEY_PROD
        export VUE_APP_CHANNEL_PLUGIN_KEY=$CHANNEL_PLUGIN_KEY
    fi
fi

echo $TRIGGER_TYPE $CACHE_DOCKER_TAG $DOCKER_TAG
