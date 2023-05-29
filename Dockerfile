# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18-alpine 

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# Installing dependencies
COPY ./package.json /app
RUN npm install --force

# Copying all the files in our project
COPY . .

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000

# Starting our application
CMD npm start