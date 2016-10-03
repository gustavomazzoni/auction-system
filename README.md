# Auction game app

Realtime app built with Angular & Node & socket.io (and for MySQL database).

## Solution
A single-page application was built using [AngularJS](https://angularjs.org/), for the client side, integrated to the Node backend via socket.io to keep clients connected to synchronize in real time every client on any updates.

## Key solutions:
- socket.js

    I've chose to use socket.io because of its large community, created by a strong company and because it handles perfectly the real-time communication with the server choosing the best protocol available and providing features like automatic reconnection.

- real-time (socket.io) - websocket vs http

    I've decided to go only with socket.io choosing the best protocol available. Since we needed a real-time app, I used socket.io to communicate with the server emiting requests for operations and also listening for data changes.
    
### Server side (Node)
- Assyncronous and parallel process ('async' lib)

    I've used async library to handle parallel process with a single callback.

- User table / login process ('socketio-auth' lib)

    I've not created a User model class so it will only be used inside socketio-auth process. socketio-auth library was used to handle socket.io authentication.
    
### Client side (angular)
- GamaManager (game.service) - why to use it instead of the Controller?
    
    Because of the interaction with socket.io. To keep the controllers thin, I have only placed what I want to expose in the scope and routing.

- Why GameManager is setted in scope?
    
    So the changes in its datas reflected in the scope components.

- logout process

    I have created a reusable process where it's only necessary to go to the logout state.

- responsive layout (side nav for mobile) and material design 'flex'

    I've used Angular Material layout features like flex (CSS3 flexbox) to create responsive layouts.

- factory vs service

    I use service to keep object state. Factory for a stateless object.


## Running the app
### Download the project
Download or clone the project using following command:
```sh
$ git clone https://github.com/gustavomazzoni/auction-system
```
### Install
Install MySQL server locally, then run the scripts to setup:
```sh
$ cd server/ && ./db-create.sh
$ ./db-init.sh
$ ./db-setup.sh
```
Install project dependencies
```sh
$ npm install
```
### Run
Then start the project
```sh
$ npm start
```

Open on your browser:
http://localhost:3000/
