![banner](https://github.com/tlklein/CIS-4375-Team3-CapstoneProject/blob/main/Screenshot%202025-04-09%20153009.png)

# Team 3 - Innov8
# CIS-4375-Team3-CapstoneProject

This project is a full-stack web application designed for an individual barbershop owner.  
It includes a public-facing webpage for visitors and a private dashboard for the owner to manage clients, services, and events.  
The frontend is built using Vue.js, and the backend is powered by Node.js and Express, with a MySQL database hosted on AWS RDS.

git pull origin test - to pull from test branch

git pull origin main - to pull from main branch

## FRONTEND ##
Open a terminal and navigate to the frontend directory using Visual Studio Code or Command Prompt

npm install

npm run dev

Create a .env file in the frontend directory

Copy and paste the following into the .env file:

VITE_ROOT_API=http://localhost:3004

## BACKEND ##
Open a terminal and navigate to the backend directory using Visual Studio Code or Command Prompt

npm install

npm run dev (development)

npm start (production)

Create a .env file in the backend directory

Copy and paste the following into the .env file:

DB_HOST=barbershop.cb6peykbvcu0.us-east-1.rds.amazonaws.com

DB_USER=admin

DB_PASSWORD=adminpw2025$

DB_NAME='BarbershopDB'

PORT=3004


## To start backend, first log in to AWS Academy ##

Click "Modules" and click "Start Lab"

Wait for the dot to change from red to green

Click "AWS" at the top to open the console

In the AWS Console, go to "RDS"

Locate your database instance and click "Start" to launch it

