
* GamaManager (game.service) - why to use it instead of the Controller?
Because of the interaction with socket.io. To keep the controllers thin, I have only placed what I want to expose in the scope and routing stuff.

* Why GameManager is setted in scope?
So the changes in its datas reflected in the scope components.

* logout process
I have created a reusable process where it's only necessary to go to the logout state.

* socket.js
I've choose to use socket.io because of its large community, created by a strong company and because it handles perfectly the real-time communication with the server choosing the best protocol available and providing features like automatic reconnection.

* models Classes ('async' lib)
I've used asyng library to handle parallel process with a single callback.

* User table / login process ('socketio-auth' lib)
I've not created a User model class so it will only be used inside socketio-auth process. socketio-auth library was used to handle socket.io authentication.

* real-time (socket.io) - websocket vs http
I've decided to go only with socket.io choosing the best protocol available. Since we needed a real-time app, I used socket.io to communicate with the server emiting requests for operations and also listening for data changes.

* responsive layout (side nav for mobile) and material design 'flex'
I've used Angular Material layout features like flex (CSS3 flexbox) to create responsive layouts.

* factory vs service
I use service to keep object state. Factory for a stateless object.

* exception handling

* unit test
* controller as 'vm' 
* client side dependencies: angular-ui, less, jasmine, karma, grunt, bower
* project folder structure (ngBoilerplate)

