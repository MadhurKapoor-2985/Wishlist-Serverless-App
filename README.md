# Wishlist-Serverless-App
A application where user can store his wishlist developed using Serverless Framework

Serverless Wishlist App
This is a simple Wishlist application using AWS Lambda and Serverless framework. 

Functionality of the application
This appliation will allow to create/remove/update/get Wishlist items. Each wishlist item can optionally have an attachment image. Each user only has access to wishlist items that he/she has created.

Functions

The following functions have been implemented in the API. This can be found in the backendservice folder

Auth - this function implements a custom authorizer for API Gateway that is added to all other functions.
GetWishlistItems -  Return all itemss for a current user.
CreateWishlistItem - Creates a new wishlist item for the current user. Validation is provided using the request validator plugin. The request file can be seen to have a look at the format of the request
UpdateWishlistItem - Updates a wishlist item created by a current user. A shape of data send by a client application to this function can be found in the request file
DeleteWishlistItem - Deletes a wishlist item created by a current user. Expects an id of a wishlist item to remove.
GetItemUploadUrl - returns a presigned url that can be used to upload an attachment file for a wishlist item.


An id of a user is extracted from a JWT token passed by a client


Frontend
The frontend folder contains a react web application that can use the API that should be developed in the project.

To use it please edit the config.ts file in the client folder:

const apiId = '...' API Gateway id
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: '...',    // Domain from Auth0
  clientId: '...',  // Client id from an Auth0 application
  callbackUrl: 'http://localhost:3000/callback'
}



How to run the application
Backend
To deploy an application run the following commands:

cd backendservice
npm install
sls deploy -v

Frontend
To run a client application first edit the client/src/config.ts file to set correct parameters. And then run the following commands

cd frontend
npm install
npm run start
This should start a development server with the React application that will interact with the serverless Wishlist application.
