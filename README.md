# Node_Messaging_Server
This is a messaging app created from scratch using node js. I did not use any frameworks or additional resources
other than vanilla javascript, and the app isn't held to industry standards or best practices. It was simply a way
for me to learn how to impement a server, and how things work under the hood without the adstraction that frameworks
like express provide.

The app uses two servers that listen on two different ports, and the client can type a message and send it to the other 
server and it can view the most recent message that was sent by the other server by going to '/msg' from the index page.

I also intend to add a database to store chat logs so that the client can access them.
