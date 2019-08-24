import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { WishlistItem } from '../models/WishlistItem'

const XAWS = AWSXRay.captureAWS(AWS)

export class WishlistDataAccess {
    constructor(
        private readonly docClient: AWS.DynamoDB.DocumentClient = createDynamoDBClient(),
        private readonly wishlistTable = process.env.WISHLIST_TABLE
    ) { }

    async createWishlistItem(item: WishlistItem): Promise<WishlistItem> {
        await this.docClient.put({
            TableName: this.wishlistTable,
            Item: item
        }).promise()

        return item
    }
}

function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}
