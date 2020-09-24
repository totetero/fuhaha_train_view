#!/bin/bash

[ ${#} -eq 0 ] && sh ${0} help && exit
[ ${#} -eq 1 ] && [ ${1} = "first" ] && sh ${0} create start && exit
[ ${#} -eq 1 ] && [ ${1} = "second" ] && sh ${0} address put build login serve && exit
[ ${#} -eq 1 ] && [ ${1} = "last" ] && sh ${0} stop clear && exit

BASE_NAME1=fuhaha
BASE_NAME2=train-view
TARGET1_CONTAINER=${BASE_NAME1}-ctr-${BASE_NAME2}
TARGET1_IMAGE=${BASE_NAME1}-img-${BASE_NAME2}
TARGET1_IMAGE_TAG=1.0.0
TARGET1_PORT_HOST_OUTER=5000
TARGET1_PORT_HOST_INNER=5000
TARGET1_PORT_FUNC_OUTER=5001
TARGET1_PORT_FUNC_INNER=5001
TARGET1_PORT_OAUTH=9005

for ARG in "${@}" ; do
	echo -------- ${ARG} start --------
	# 引数解釈
	case ${ARG} in
		# ----------------------------------------------------------------

		status)
			docker network ls
			echo '--------'
			REGEXP='/'${TARGET1_IMAGE}'.*'${TARGET1_IMAGE_TAG}'/'
			docker images | awk '{ if ($0 ~ '${REGEXP}') { print "\033[0;31m" $0 "\033[0;39m" } else { print } }' -
			echo '--------'
			REGEXP='/'${TARGET1_CONTAINER}'/'
			docker ps -a | awk '{ if ($0 ~ '${REGEXP}') { print "\033[0;31m" $0 "\033[0;39m" } else { print } }' -
			;;

		# ----------------------------------------------------------------

		create)
			docker build --tag ${TARGET1_IMAGE}:${TARGET1_IMAGE_TAG} --force-rm .
			[ ${?} -gt 0 ] && exit
			docker create --name ${TARGET1_CONTAINER} --publish ${TARGET1_PORT_HOST_OUTER}:${TARGET1_PORT_HOST_INNER} --publish ${TARGET1_PORT_FUNC_OUTER}:${TARGET1_PORT_FUNC_INNER} --publish ${TARGET1_PORT_OAUTH}:${TARGET1_PORT_OAUTH} --interactive --tty ${TARGET1_IMAGE}:${TARGET1_IMAGE_TAG} /bin/bash --login
			[ ${?} -gt 0 ] && exit
			;;
		start)
			docker start ${TARGET1_CONTAINER}
			;;
		bash)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash
			;;
		stop)
			docker stop ${TARGET1_CONTAINER}
			;;
		clear)
			docker rm ${TARGET1_CONTAINER}
			docker rmi ${TARGET1_IMAGE}:${TARGET1_IMAGE_TAG}
			;;
		sync_put|put)
			RSYNC_SRC=./
			RSYNC_DST=${TARGET1_CONTAINER}:/root/project/workspace/
			RSYNC_COMMAND="rsync --blocking-io -e 'docker exec -i' --filter=':- .gitignore' -rltDv"
			eval ${RSYNC_COMMAND} --exclude='.git' --exclude='hosting/src' --exclude='functions/src' ${RSYNC_SRC} ${RSYNC_DST}
			eval ${RSYNC_COMMAND} --delete ${RSYNC_SRC}hosting/src/ ${RSYNC_DST}hosting/src/
			eval ${RSYNC_COMMAND} --delete ${RSYNC_SRC}functions/src/ ${RSYNC_DST}functions/src/
			;;
		sync_get|get)
			RSYNC_SRC=${TARGET1_CONTAINER}:/root/project/workspace/
			RSYNC_DST=./
			RSYNC_COMMAND="rsync --blocking-io -e 'docker exec -i' --exclude='.git' --filter=':- .gitignore' -rltDv"
			eval ${RSYNC_COMMAND} ${RSYNC_SRC} ${RSYNC_DST}
			;;
		address)
			DOCKER_IP=$(docker inspect -f '{{.NetworkSettings.IPAddress}}' ${TARGET1_CONTAINER})
			DOCKER_HOSTIP=$(docker inspect -f '{{(index (index .NetworkSettings.Ports "'${TARGET1_PORT_HOST_INNER}'/tcp") 0).HostIp}}' ${TARGET1_CONTAINER})
			DOCKER_HOSTPORT=$(docker inspect -f '{{(index (index .NetworkSettings.Ports "'${TARGET1_PORT_HOST_INNER}'/tcp") 0).HostPort}}' ${TARGET1_CONTAINER})
			echo http://${DOCKER_HOSTIP}:${DOCKER_HOSTPORT}
			;;

		# ----------------------------------------------------------------

		install)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && npm install'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd hosting && npm install'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd functions && npm install'
			;;
		login)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && npm run login'
			;;
		mock)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd hosting && npm run build_mock'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd functions && npm run build_mock'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd functions && node mock.js'
			;;
		build)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd hosting && npm run build_development'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd functions && npm run build_development'
			;;
		serve)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && npm run serve'
			;;
		deploy)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd hosting && npm run build_production'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd functions && npm run build_production'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && npm run deploy'
			;;
		clean)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && rm -rf hosting/node_modules/.cache/hard-source'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && rm -rf functions/node_modules/.cache/hard-source'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && rm -rf hosting/src'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && rm -rf functions/src'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && rm -rf node_modules'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd hosting && rm -rf node_modules'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd functions && rm -rf node_modules'
			;;
		test)
			;;

		# ----------------------------------------------------------------

		help)
			echo no help
			;;
		*)
			echo nothing to do
			;;

		# ----------------------------------------------------------------
	esac
	echo -------- ${ARG} exit --------
done
