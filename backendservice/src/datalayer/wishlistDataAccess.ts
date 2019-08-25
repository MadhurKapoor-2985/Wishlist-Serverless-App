import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { WishlistItem } from '../models/WishlistItem'

const XAWS = AWSXRay.captureAWS(AWS)

export class WishlistDataAccess {
    constructor(
        private readonly docClient: AWS.DynamoDB.DocumentClient = createDynamoDBClient(),
        private readonly wishlistTable = process.env.WISHLIST_TABLE,
        private readonly indexName = process.env.INDEX_NAME
    ) { }

    async createWishlistItem(item: WishlistItem): Promise<WishlistItem> {
        await this.docClient.put({
            TableName: this.wishlistTable,
            Item: item
        }).promise()

        return item
    }

    async getWishlistItems(userId: string): Promise<WishlistItem[]> {
        const result = await this.docClient.query({
            TableName: this.wishlistTable,
            IndexName: this.indexName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        const items = result.Items
        return items as WishlistItem[]
    }

    async getWishlistItemById(itemId: string, userId: string): Promise<WishlistItem> {
        const result = await this.docClient.get({
            TableName: this.wishlistTable,
            Key: {
                wishlistItemId: itemId,
                userId: userId
            }
        }).promise()

        return result.Item as WishlistItem
    }

    async deleteWishlistItemById(itemId: string, userId: string) {

        let params = {
            TableName: this.wishlistTable,
            Key: {
                wishlistItemId: itemId,
                userId: userId
            }
        }

        console.log('Deleting item with key ', itemId)

        await this.docClient.delete(params, function (err, data) {
            if (err) {
              console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Delete succeeded:", JSON.stringify(data, null, 2));
            }
            }).promise()


    }
}

function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}
