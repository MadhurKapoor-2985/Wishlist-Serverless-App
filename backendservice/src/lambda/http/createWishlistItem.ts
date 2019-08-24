import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateWishlistItemRequest } from '../../requests/CreateWishlistItemRequest'
import { createWishlistItem } from '../../businesslogic/wishlistLogic'


export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newWishlistItem: CreateWishlistItemRequest = JSON.parse(event.body)

    const userId = 'test'

    const newItem = await createWishlistItem(newWishlistItem, userId)

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
        body: JSON.stringify({
            item: newItem
        })
    }
}