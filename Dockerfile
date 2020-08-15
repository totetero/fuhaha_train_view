FROM ubuntu:20.04

WORKDIR /root/project/workspace
COPY . /root/project/workspace

ENV DEBIAN_FRONTEND noninteractive

RUN \
apt-get update && \
apt-get install -y rsync && \
apt-get install -y php
