FROM ubuntu:20.04

WORKDIR /root/project/workspace
COPY . /root/project/workspace

ENV DEBIAN_FRONTEND noninteractive

RUN \
apt-get update && \
apt-get install -y rsync && \
apt-get install -y curl

RUN \
apt-get install -y nodejs && \
apt-get install -y npm && \
npm install n -g && \
n 12.14.1 && \
apt-get purge -y npm && \
apt-get purge -y nodejs

RUN \
npm install && \
cd /root/project/workspace/hosting && \
npm install && \
cd /root/project/workspace/functions && \
npm install
