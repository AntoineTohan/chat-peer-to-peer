# Peer to peer chat app on local network

DURAND Antoine | THOMAS Hugo

**Important:** Although we have done our best efforts to make sure the information in here is as complete, accurate, and up-to-date as possible.

The boilerplate used is handmade with :

nodejs + react + electron + express

The advantage of Electron is that it allows us to create desktop applications with executables easily.

React in front with the use of client socket to connect to the server and exchange and real time and the Bootstrap framework to make Ui pleasant.

NodeJs is express are the base of our back end which plays here the role of peer to peer server and server for the electron app.

WARNING : electron entry point of back end is in public folder@ requires if I want to compile and create executables. The file must be accessible by all other files in the project.

## Environment prerequisites

- Node v10.17.0
- Yarn v1.21.0
- Git v2.20.1

## Environment prerequisites

download and install NodeJs

https://nodejs.org/en/

Install yarn

https://yarnpkg.com/lang/en/docs/install/

## Intallation guide

Get archive and unzip it
or
```
git clone https://github.com/AntoineTohan/chat-peer-to-peer.git
```

```
cd chat-peer-to-peer/

yarn

yarn electron:dev

```

Generate executables

```

yarn electron-pack-windows // for .exe app
yarn electron-pack-mac // for .dmg app
```




To make a test with two customers on the same machine just start the electron application. You would have a client connect opened a new chatroom without entering an IP. 

Then go to your browser on http://localhost:3000/ and you would have another client on the side.

All you have to do is not enter any IP address and you will be connected to the same chatroom as the client that started the desktop application.