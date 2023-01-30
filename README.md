# IP Lookup service
The service fetches IP address data from ipwhois.io

## Run application

  * Install dependencies `npm i` and build application binary `npm run build`
  * Run `docker-compose up --build`

## REST API description

  Base path - `http://localhost:3000`

  POST `/lookup/:ipAddr` - lookup IP address data, saves into database. It is also used to get IP address data.
  
  DELETE `/lookup/:ipAddr` - removes IP address data from database
