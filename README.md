# Example for nest-amqp

This is a example NestJS project that is using nest-amqp.
It is a REST-Interface to interact with an ActiveMQ Broker.

## Step 1: Start docker image to have an AMQP broker

```
docker-compose up
```

## Step 2: Start example

```
npm install
npm run start
```

HTTP server is listing under port `4444`.
You can use the requests in `./http-requests/add-user.http` for testing;

## Step3 load spatial data

```
ogr2ogr -f "PostgreSQL" PG:"host=127.0.0.1 port=5432 dbname=bureaudevote user=bureaudevote password=bureaudevote" '/home/aureliano/git/datahub/docker/postgres/data/insee-code-postal.geojson'  -nln insee_code_postal
```
