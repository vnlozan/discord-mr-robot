FROM node:13.6.0-stretch
# FROM node:8.15.0-jessie
# FROM nikolaik/python-nodejs:python3.6-nodejs10-stretch

RUN apt-get -y update
RUN apt-get install python
RUN apt-get -y install ffmpeg
RUN mkdir -p /usr/local/src/mr-robot

WORKDIR /usr/local/src/mr-robot
COPY package.json /usr/local/src/mr-robot
RUN npm install axios
RUN npm install node-html-parser
RUN npm install discord.js
RUN npm install ffmpeg
RUN npm install opusscript
RUN npm install ytdl-core
# RUN npm install node-opus

COPY . /usr/local/src/mr-robot
# COPY . .
CMD ["node", "index.js"]



# docker images
# docker build -t mr-robot:v1 .
# docker run -d mr-robot:v1
# docker stop {container_id}
# docker rm {container_id} #remove
# docker rmi {image_id} #remove image

# shutdown -h now
