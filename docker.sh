#!/bin/bash

[ ${#} -eq 0 ] && sh ${0} help && exit
[ ${#} -eq 1 ] && [ ${1} = "first" ] && sh ${0} create start && exit
[ ${#} -eq 1 ] && [ ${1} = "second" ] && sh ${0} address put build serve && exit
[ ${#} -eq 1 ] && [ ${1} = "last" ] && sh ${0} stop clear && exit

BASE_NAME1=fuhaha
BASE_NAME2=train-view
TARGET1_CONTAINER=${BASE_NAME1}-ctr-${BASE_NAME2}
TARGET1_IMAGE=${BASE_NAME1}-img-${BASE_NAME2}
TARGET1_IMAGE_TAG=1.0.0
TARGET1_PORT_OUTER=8080
TARGET1_PORT_INNER=8080

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
			docker create --name ${TARGET1_CONTAINER} --publish ${TARGET1_PORT_OUTER}:${TARGET1_PORT_INNER} --interactive --tty ${TARGET1_IMAGE}:${TARGET1_IMAGE_TAG} /bin/bash --login
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
			RSYNC_COMMAND="rsync --blocking-io -e 'docker exec -i' --exclude='.git' --filter=':- .gitignore' -rltDv"
			eval ${RSYNC_COMMAND} ${RSYNC_SRC} ${RSYNC_DST}
			;;
		sync_get|get)
			RSYNC_SRC=${TARGET1_CONTAINER}:/root/project/workspace/
			RSYNC_DST=./
			RSYNC_COMMAND="rsync --blocking-io -e 'docker exec -i' --exclude='.git' --filter=':- .gitignore' -rltDv"
			eval ${RSYNC_COMMAND} ${RSYNC_SRC} ${RSYNC_DST}
			;;
		address)
			DOCKER_IP=$(docker inspect -f '{{.NetworkSettings.IPAddress}}' ${TARGET1_CONTAINER})
			DOCKER_HOSTIP=$(docker inspect -f '{{(index (index .NetworkSettings.Ports "'${TARGET1_PORT_INNER}'/tcp") 0).HostIp}}' ${TARGET1_CONTAINER})
			DOCKER_HOSTPORT=$(docker inspect -f '{{(index (index .NetworkSettings.Ports "'${TARGET1_PORT_INNER}'/tcp") 0).HostPort}}' ${TARGET1_CONTAINER})
			echo http://${DOCKER_HOSTIP}:${DOCKER_HOSTPORT}
			;;

		# ----------------------------------------------------------------

		install)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && npm install'
			;;
		build)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && npm run build'
			;;
		serve)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && npm run serve'
			;;
		clean)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && rm -rf src'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && rm -rf dist'
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && rm -rf node_modules'
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
