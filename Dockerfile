# FROM node:8.15.0-jessie
FROM node:13.6.0-stretch

RUN apt-get -y update
RUN apt-get -y install ffmpeg

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# This will tell docker to create a directory inside the container called bot 
# and then will tell docker that the bot folder is the working directory where all the main code will be.
# Copy and Install our bot

COPY package.json /usr/src/bot
RUN npm install

# This will tell docker to copy the package.json file over to the container 
# and then run npm install which will run all of the packages the bot needs in order to run correctly

# Our precious bot
COPY . /usr/src/bot

# Start me!
CMD ["node", "index.js"]



# docker images
# docker build -t mr-robot:v1 .
# docker run -d mr-robot:v1
# docker stop {container_id}
# docker rm {container_id} #remove
# docker rmi {image_id} #remove image

# shutdown -h now