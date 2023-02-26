CREATE DATABASE perstack;

CREATE TABLE todo(
  /* serial is for incrementing the the primary key for every new todo request*/
  todo_id SERIAL PRIMARY KEY, 
  description VARCHAR(255) 

);