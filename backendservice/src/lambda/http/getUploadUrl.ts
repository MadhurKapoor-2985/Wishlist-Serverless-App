import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { getItemUploadUrl } from '../../businesslogic/wishlistLogic'

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const itemId = event.pathParameters.wishlistItemId

    const url = await getItemUploadUrl(itemId)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
        body: JSON.stringify({
            uploadUrl : url
        })
    }
}