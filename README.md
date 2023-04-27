# Backend-code

# Create .env file
```
API_URL =/api/v1
secret = my-name-is-no-name
CONNECTION_STRING = mongodb+srv://minhquangln:lnmq2002@edward.9ufk7rw.mongodb.net/?retryWrites=true&w=majority
```

# Routes

### Category

```
GET      /api/v1/categories
GET      /api/v1/categories/:id
POST     /api/v1/categories
PUT      /api/v1/categories/:id
DELETE   /api/v1/categories/:id
```

### Services

```
GET      /api/v1/services
GET      /api/v1/services/:id
POST     /api/v1/services
PUT      /api/v1/services/:id
DELETE   /api/v1/services/:id
PUT gallery-images : /api/v1/services/gallery-images/:id
GET featured services: /api/v1/services/get/featured/:count
GET services count: /api/v1/services/get/count
```

### Users

```
GET      /api/v1/users
GET      /api/v1/users/:id
POST     /api/v1/users
PUT      /api/v1/users/:id
DELETE   /api/v1/users/:id
GET users count: /api/v1/users/get/count
```

#### Register new user

```
POST     /api/v1/users/register
(name, email, password, phone)
```

#### Login user

To login the user and get the auth token:

```
POST     /api/v1/users/login
(email, password)
```
#### Logout user

```
POST     /api/v1/users/logout

```

