## Direct democracy

In direct democracy people is free to get involved in the democratic process in an active way.

## Client

The clients is everyone involved in the edemocracy process. 

## Server

Is the PA in charge to orquestrate the democratic process and define limits and rules of the game.

## Message Broker

Rabbitmq is a messqgge broker in charge to dispatch the messages. Privacy should be granted through encryption mechanism.
 
## workflow

0. client and PA share public key in postgres database

``` 
curl --location --request POST 'http://localhost:4444/admin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name" : "Mairie de Vallauris",
    "email" : "mairievallauris@qwant.com",
    "passphrase" : "pass"
}'
```

1. client manifest interest to consultation sharing his pub key with PA
2. PA encode a message and send it to client sharing his pub key
3. client decrypt the message and answer via crypted message
4. PA receive answer decrypt and do stuff with it

## todo

https://jaygould.co.uk/2019-01-21-decrypting-gpg-file-node-programatically/
https://circleci.com/blog/getting-started-with-nestjs-and-automatic-testing/
https://github.com/team-supercharge/nest-amqp/
