import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { getWishlistItemById } from '../../businesslogic/wishlistLogic'
import { getUserId } from '../../lambda/utils'

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    var itemId = event.pathParameters.wishlistItemId

    const userId = getUserId(event)
    const result = await getWishlistItemById(itemId, userId)

    console.log('Result is ', result)

    if(result === undefined) {
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

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
        body: JSON.stringify({
            item: result
        })
    }

}