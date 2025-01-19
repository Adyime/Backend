FROM node:20-alpine AS development-dependencies-env

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Expose the port that your app will run on (adjust if needed)
EXPOSE 5000

# Step 7: Define the command to run your app
CMD ["npm", "start"]
