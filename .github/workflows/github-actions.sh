#!/bin/bash


# GITHUB_REF: refs/heads/<branch_name>, refs/tags/<tag_name>
if [ ! -z $GITHUB_REF ]; then
    TRIGGER_TYPE=$(echo $GITHUB_REF | cut -d '/' -f2)
    NAME=$(echo $GITHUB_REF | cut -d '/' -f3-)

    if [ $TRIGGER_TYPE = "heads" ]; then
        if [ $NAME = "master" ]; then
            export DOCKER_TAG=prod
            export CACHE_DOCKER_TAG=prod
        else
            # Docker tag에 /가 들어갈 수 없어서 -로 변경
            export DOCKER_TAG=$(echo $NAME | sed -e "s/\//-/g")
            export CACHE_DOCKER_TAG=dev
        fi
    elif [ $TRIGGER_TYPE = "tags" ]; then
        export DOCKER_TAG=$NAME
        export CACHE_DOCKER_TAG=prod
    fi
fi

echo $TRIGGER_TYPE $CACHE_DOCKER_TAG $DOCKER_TAG
