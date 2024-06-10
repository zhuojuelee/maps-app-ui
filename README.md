# Map app UI

## Pre-requisites
Have the following installed:
- NodeJS 18

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

## Running the app
Run `yarn dev`

Head over to `localhost:5432`
