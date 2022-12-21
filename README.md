'node app.js' to run.

I've had problems with initializing the database with raw SQL query dynamically, and the asynchronous mechanisms of Sequelize due to the fact that I have no prior experience with it.

Database with name specified in the .env file should be initialized via psql beforehand, and the app throws a unique key constraint error the first time it is run. Works fine afterwards.
