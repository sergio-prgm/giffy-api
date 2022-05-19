FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install 
RUN npm ci

COPY . .

EXPOSE 4000
CMD [ "npm", "start"]

# Run normally (view the logs on the terminal)
# sudo docker run -it -p 4001:4000 sergio-dev/giffy-api
# Tun dettached (no logs on the terminal)
# sudo docker run -p 4001:4000 -d sergio-dev/giffy-api

# Stop container execution (same as <C-c>)
# sudo docker stop <image id>

# Show containers running
# docker ps
