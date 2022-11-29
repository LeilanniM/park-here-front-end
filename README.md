# Park-Here.com
Always find a spot to park your car and/or host your parking spot for some extra cash.

### User story
Created an app that helps people with the increasingly difficult parking situation in main cities where events such as fairs, coachella, concerts make finding parking near impossible or very expensive. With the app, locals can rent out their parking spaces such as driveways, dirt lots, etc for a fair price.

* As a user, I want to create an account.
* As a user, I want to login.
* As a user, I want to logout.
* As a user, I want to create a parking space to host.
* As a user, I want to book a parking space.
* As a user, I want to view available parking spaces.
* As a user, I want to add/delete parking spaces hosted by me.

### Approach taken
For the backend, I created three models to handle the user, parking and booking information. Each model referencing the other through their Ids. Each model has all basic RESTful routes and full CRUD.
For Authentication I used JSONWebTokens and he browser's local storage.

### Technology used
* express
* mongodb
* cors
* react
* axios
* bcrypt
* Google maps API 
* Google places autocomplete API
* Imagebb API
* mongoose 

### Features to be added in the future
* Payment processing 
* Chat to communicate with host.
* Insurance implementation.
* Filtering/sorting
* Ability to use user's location to suggest near by places.

### Home Page
![Screen Shot 2022-11-01 at 7 27 44 PM](https://user-images.githubusercontent.com/105605004/204665223-0e57fa3c-6a9e-4f4c-b1c8-81b3e426f780.png)

