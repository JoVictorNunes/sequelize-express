# Sequelize and Express

> A simple backend application that shows the basics of ```Express + Sequelize```.

# Features

- Migrations;
- Model definition;
- Associations;
- CRUD operations;
- Route definition;
- Usage of middlewares;
- Unit and integration tests, etc.

# How to install

**First** you need to install MySQL and create a database.

1. Run ```git clone https://github.com/JoVictorNunes/sequelize-express.git``` or ```git clone git@github.com:JoVictorNunes/sequelize-express.git```
2. Run ```cd sequelize-express```
3. Run ```npm install``` or ```yarn install```
4. Then, open the *database/config/config.json* file and set the **database** property under **development** as the database's name you have created, as well as your login **username** and **password**. Set **timezone** if needed.
5. Run ```npm run migrate```
6. Run ```npm start```