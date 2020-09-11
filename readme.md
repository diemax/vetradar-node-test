# Unicorn Vet Group - NodeJS Backend Test :unicorn: 

# REST API example application

This is a bare-bones example of a Sinatra application providing a REST
API to a DataMapper-backed model.

## Install

```bash 
$ npm i
```
Or 
```bash
$ yarn
```

## Run the app
```bash
$ npm run start
```

# REST API

The REST API to the example app is described below.

## Get cart contents

### Request

`GET /cart/`

    curl -i -H 'Accept: application/json' http://localhost:3000/cart/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
        id: "uuid",
        items: [],
        total: 0
    }

## Add a new item to the cart

### Request

`POST /cart/id`
```bash
$ curl --header "Content-Type: application/json" --request POST  --data '{"name":"xyz","price":33.35}' http://localhost:3000/cart/uuid
   ``` 
### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {
      "id": "d507c2eb-2797-4df0-ac46-d7bcaae2e057",
      "items": [
          {
              "name": "xyz",
              "price": 33,35,
              "qty": 1
          }
      ],
      "total": 33.35
    }


## Get a non-existent cart

### Request

`GET /cart/id`

    curl -i -H 'Accept: application/json' http://localhost:3000/cart/9999

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"message":"Cart not found"}


## Add an existing item to the cart

### Request
`PUT /cart/id`
`POST /cart/id`
```bash
$ curl --header "Content-Type: application/json" --request POST  --data '{"name":"xyz","price":33.35}' http://localhost:3000/cart/uuid
```


### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {
      "id": "d507c2eb-2797-4df0-ac46-d7bcaae2e057",
      "items": [
          {
              "name": "xyz",
              "price": 33,35,
              "qty": 2
          }
      ],
      "total": 66.70
    }

## Delete a cart item

### Request

`DELETE /cart/{id}/{item}`

```
$ curl -i -H 'Accept: application/json' -X DELETE http://localhost:3000/cart/1/item/1
```

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 204 No Content
    Connection: close

### Thanks for reviewing my application!
### Happy hacking! :) 
