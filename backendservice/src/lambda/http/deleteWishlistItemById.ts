import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { deleteWishlistItemById, getWishlistItemById } from '../../businesslogic/wishlistLogic'
import { getUserId } from '../../lambda/utils'

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const itemId = event.pathParameters.wishlistItemId
    const userId = getUserId(event)

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

    await deleteWishlistItemById(itemId, userId)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
        body: null
    }

}