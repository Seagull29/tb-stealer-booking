FROM node:22-alpine 
RUN apt-get update && apt-get install git -y
WORKDIR /usr/src/client
COPY . .
CMD [ "sleep", "infinity" ]