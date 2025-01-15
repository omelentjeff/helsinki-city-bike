# helsinki-city-bike
App for viewing Helsinki City Bike journey data.

## How to run the app locally
1. Make sure Docker Desktop is installed and running. If you don't have it, you can install it here: https://www.docker.com/products/docker-desktop/
   
2. Clone the repository to your computer and move to the project root:


  ```
git clone https://github.com/omelentjeff/helsinki-city-bike
cd helsinki-city-bike
  ```
  
3. Build docker container (This can take a few moments):
```
docker-compose up --build -d
```

5. Once it's done, navigate to 'http://localhost:3000' on your browser.

6. First, you will need to create a new user, it can be either Admin or User
  
7. When you want to stop, run:

```
docker-compose down
```
