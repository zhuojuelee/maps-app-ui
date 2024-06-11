# Map app UI

## Pre-requisites
Have the following installed:
- NodeJS 18
- Docker (Optional)

## Setup
First add a `.env` file at the repo's root with the following environment variables:
- `VITE_GOOGLE_API_KEY` You can get this from Google's cloud console (Please enable Maps and Places API)
- `VITE_SERVER_URI` 
```
# Example .env file
VITE_GOOGLE_API_KEY=YOUR_API_KEY 
VITE_SERVER_URI=localhost:8080
```

Then `yarn install`

## Running the app locally
Run `yarn dev`

Head over to `localhost:3000`

## Running the app locally with Docker
Run the following commands 
```bin\bash
docker build . -t maps-app
docker run -d -p 3000:3000 maps-app 
```

Go to `localhost:3000`

To stop the docker process:
```bin\bash
docker ps // Get the container ID
docker stop <container_id>
```
