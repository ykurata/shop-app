# Buy and Sell (Yajiji)

This is an application for buying and selling items.
The app allows users to post adds for things you want to sell and search for items you want to buy.  Either by the item's name or category.
Users can also send messages to the person who posted the add.
Responsive for both web and mobile.

## Built With 

* Backend
  * [NodeJS](https://nodejs.org/en/download/)
  * [Express](https://expressjs.com/)
  * [Postgres](https://www.postgresql.org/download/)


* Frondend
  * [React](https://reactjs.org/)
  * [Bootstrap](https://getbootstrap.com/)


## Requirements

* Make sure you have install and run PostgreSQL server.
* Create database with the name same as in config file.


## Getting Started 

* To get started, clone the repo to your local machine.

    ```https://github.com/ykurata/shop-app.git```

* Install all dependencies on the both back end and front end. 

    **Backend (Server)**
        
    * Go to the root directory(shop-app), and run `npm install`.
    
    * Run `sequelize db:migrate`

    * To start server, run `nodemon` or `npm start`.


    **Frontend (Client)**

    * Go to client directory, and run `npm install`.

    * To start client, run `npm start`.

    


## Features
* ### Register/ Login / Logout
<div align="center">
  <img src="./readme-assets/login.gif" width="700" heigt="500">
</div>    
<br />
<br />

* ### Create adds for your items. 
<div align="center">
  <img src="./readme-assets/create-add.jpg" width="700" heigt="500">
</div>  
<br />
<br />

* ### Add images for your items.
<div align="center">
  <img src="./readme-assets/add-images.jpg" width="700" heigt="500">
</div>  
<br />
<br />

* ### Search items through items's name and category.
<div align="center">
  <img src="./readme-assets/list-items.gif" width="700" heigt="500">
</div>  
<br />
<br />

* ### Sending messages to other users.
<div align="center">
  <img src="./readme-assets/sending-message.gif" width="700" heigt="500">
</div>  
<br />
<br />

* ### Replying to a message
<div align="center">
  <img src="./readme-assets/replying-message.gif" width="700" heigt="500">
</div>  
<br />        

