# FROM node:8.15.0-jessie
FROM node:13.6.0-stretch

RUN apt-get -y update
RUN apt-get -y install ffmpeg

RUN mkdir -p /usr/src/mr-robot
WORKDIR /usr/src/mr-robot

# This will tell docker to create a directory inside the container called bot 
# and then will tell docker that the bot folder is the working directory where all the main code will be.
# Copy and Install our bot

COPY package.json /usr/src/mr-robot

RUN npm install

COPY . /usr/src/mr-robot

# This will tell docker to copy the package.json file over to the container 
# and then run npm install which will run all of the packages the bot needs in order to run correctly

# Our precious bot
COPY . /usr/src/mr-robot

# Start me!
CMD ["node", "index.js"]



# docker images
# docker build -t mr-robot:v1 .
# docker run -d mr-robot:v1
# docker stop {container_id}
# docker rm {container_id} #remove
# docker rmi {image_id} #remove image

# shutdown -h now

# https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/v2v_guide/preparation_before_the_p2v_migration-enable_root_login_over_ssh