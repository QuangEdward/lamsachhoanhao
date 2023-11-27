## Introduction

[About the app](https://docs.google.com/presentation/d/1vDmj-XonC4_nYA6ds9e_AqG9BoQ3rEZd/edit?usp=sharing&ouid=100802006352180414710&rtpof=true&sd=true)
[Detail Feature](https://docs.google.com/presentation/d/1vDmj-XonC4_nYA6ds9e_AqG9BoQ3rEZd/edit?usp=sharing&ouid=100802006352180414710&rtpof=true&sd=true)

`UI/UX`

![image](https://github.com/QuangEdward/lamsachhoanhaocompany_backend/assets/118035047/08652353-b623-4144-9856-0a1ef6f97651)

`Admin Management`

![image](https://github.com/QuangEdward/lamsachhoanhaocompany_backend/assets/118035047/f4c9b03f-12fd-4742-968d-d4b7ec9799b3)



# Backend-code

# Create .env file
```
API_URL =/api/v1
secret = my-name-is-no-name
CONNECTION_STRING = mongodb+srv://minhquangln:lnmq2002@edward.9ufk7rw.mongodb.net/?retryWrites=true&w=majority
```

# Routes

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

