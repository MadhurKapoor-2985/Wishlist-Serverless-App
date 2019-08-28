import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateWishlistItemRequest } from '../../requests/CreateWishlistItemRequest'
import { createWishlistItem } from '../../businesslogic/wishlistLogic'
import { getUserId } from '../../lambda/utils'


export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newWishlistItem: CreateWishlistItemRequest = JSON.parse(event.body)

    const userId = getUserId(event)

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