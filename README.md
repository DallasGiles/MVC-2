MVC-2 Project

Description

This project is a CMS-style blog application built using the Model-View-Controller (MVC) architecture. The application is designed to handle user authentication, create, read, update, and delete operations on blog posts and comments, and provide a responsive interface. The project is developed with scalability in mind, using technologies like Node.js, Express, Sequelize ORM, PostgreSQL, and Handlebars.js for templating.

Table of Contents

	•	Installation
	•	Usage
	•	Features
	•	Contributing
	•	License

Installation

	1.	Clone the Repository
    git clone https://github.com/DallasGiles/MVC-2.git
cd MVC-2

	2.	Install Dependencies
Make sure you have Node.js installed. Install the necessary Node.js packages by running:
npm install

	3.	Set Up the Database
	•	Make sure you have PostgreSQL installed and running.
	•	Create a new database:
    psql -U postgres -c "CREATE DATABASE mvc_2;"
    •	Create a new PostgreSQL user if needed, and grant them privileges on the database:
    psql -U postgres -c "CREATE USER myuser WITH PASSWORD 'mypassword';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE mvc_2 TO myuser;"

	4.	Configure Environment Variables
	•	Create a .env file in the root directory of your project with the following content:
    DB_NAME=mvc_2
DB_USER=myuser
DB_PASS=mypassword
DB_HOST=localhost
DB_PORT=5432

	5.	Run Database Migrations
	•	Sync the database and apply the models:
    npm run migrate
    	6.	Start the Application
	•	Run the server locally:
    npm start


	•	The application should now be running on http://localhost:3001.

Usage

Once the server is running, you can interact with the application via your browser:

	•	Visit http://localhost:3001 to view the homepage.
	•	Register for a new account and log in to start creating, editing, and deleting blog posts.
	•	Leave comments on posts and manage your profile.

Features

	•	User Authentication (Signup/Login/Logout)
	•	Create, Read, Update, and Delete (CRUD) operations for blog posts
	•	Comment on posts
	•	Responsive design using Handlebars templates
	•	PostgreSQL database with Sequelize ORM
	•	Secure user sessions with express-session

Contributing

Contributions are welcome! If you’d like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

	1.	Fork the Project
	2.	Create your Feature Branch (git checkout -b feature/YourFeature)
	3.	Commit your Changes (git commit -m 'Add Some Feature')
	4.	Push to the Branch (git push origin feature/YourFeature)
	5.	Open a Pull Request

License

Distributed under the MIT License. See LICENSE for more information.

Feel free to customize the README as needed for your specific project!