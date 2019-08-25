import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { updateWishlistItem, getWishlistItemById } from '../../businesslogic/wishlistLogic'
import { UpdateWishlistItemRequest } from '../../requests/UpdateWishlistItemRequest'

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = 'test'
    const itemId = event.pathParameters.wishlistItemId

    const itemUpdate: UpdateWishlistItemRequest = JSON.parse(event.body)

    const item = await getWishlistItemById(itemId, userId)

    if(item === undefined) {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
              },
            body: JSON.stringify({
                error: "No item found for the key"
            })
        }
    }

    await updateWishlistItem(itemId, userId, itemUpdate)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
        body: null
    }


}