# Inventory-Manager-Microservices

<h2>Description:</h2>
<br>
The purpose of the project is to create a platform that allows a chain of ice cream shops to receive up-to-date information at any given time and to analyze the data in the chain of shops.


<h2>System structure:</h2>
The project is built from 3 main servers
1) Responsible for simulating the sales data of the stores and sending them to server 2.
2) Responsible for receiving data from server 1, creating a data table in mySQL,
receiving data from the various APIs and entering them into a MongoDB database,
There is also the possibility to create a prediction model through BigML in order to get a sales forecast
3) Responsible for transferring data from the server side to the client side and vice versa,
Run ingest and retrieve data in time adopted to a Redis database.
