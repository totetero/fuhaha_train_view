#!/bin/bash

[ ${#} -eq 0 ] && sh ${0} help && exit
[ ${#} -eq 1 ] && [ ${1} = "first" ] && sh ${0} create start && exit
[ ${#} -eq 1 ] && [ ${1} = "second" ] && sh ${0} put build login emulators && exit
[ ${#} -eq 1 ] && [ ${1} = "last" ] && sh ${0} stop clear && exit

BASE_NAME1=fuhaha
BASE_NAME2=train-view
TARGET1_CONTAINER=${BASE_NAME1}-ctr-${BASE_NAME2}
TARGET1_IMAGE=${BASE_NAME1}-img-${BASE_NAME2}
TARGET1_IMAGE_TAG=1.0.0

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
			unset PUBLISHES
			PUBLISHES=${PUBLISHES}" --publish 4000:4000" # firebase
			PUBLISHES=${PUBLISHES}" --publish 5000:5000" # firebase
			PUBLISHES=${PUBLISHES}" --publish 5001:5001" # firebase
			PUBLISHES=${PUBLISHES}" --publish 8080:8080" # firebase
			PUBLISHES=${PUBLISHES}" --publish 8085:8085" # firebase
			PUBLISHES=${PUBLISHES}" --publish 9000:9000" # firebase
			PUBLISHES=${PUBLISHES}" --publish 9005:9005" # OAuth
			docker create --name ${TARGET1_CONTAINER} ${PUBLISHES} --interactive --tty ${TARGET1_IMAGE}:${TARGET1_IMAGE_TAG} /bin/bash --login
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
		emulators)
			docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && npm run emulators'
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
			#docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && rm -rf node_modules'
			#docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd hosting && rm -rf node_modules'
			#docker exec -it ${TARGET1_CONTAINER} /bin/bash -c 'source bin/profile.sh && cd functions && rm -rf node_modules'
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
