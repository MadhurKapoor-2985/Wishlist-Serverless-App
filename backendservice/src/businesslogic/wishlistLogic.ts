import * as uuid from 'uuid'

import { WishlistItem } from '../models/WishlistItem'
import { WishlistDataAccess } from '../datalayer/wishlistDataAccess'
import { CreateWishlistItemRequest } from '../requests/CreateWishlistItemRequest'
import { UpdateWishlistItemRequest } from '../requests/UpdateWishlistItemRequest'

const wishlistAccess = new WishlistDataAccess()

const bucketName = process.env.IMAGES_BUCKET

export async function createWishlistItem(
    request: CreateWishlistItemRequest,
    loginUserId: string): Promise<WishlistItem> {

        const itemId = uuid.v4()

        return await wishlistAccess.createWishlistItem({
            userId: loginUserId,
            wishlistItemId: itemId,
            wishlistItemName: request.wishlistItemName,
            wishlistItemDescription: request.wishlistItemDescription,
            wishlistItemLink: request.wishlistItemLink,
            complete: false,
            createdDate: new Date().toISOString(),
            imageUrl: `https://${bucketName}.s3.amazonaws.com/${itemId}`

        })

    }

export async function getWishlistItems(userId: string): Promise<WishlistItem[]> {
    return await wishlistAccess.getWishlistItems(userId)
}

export async function getWishlistItemById(itemId: string, userId: string): Promise<WishlistItem> {
    return await wishlistAccess.getWishlistItemById(itemId, userId)
}

export async function deleteWishlistItemById(itemId: string, userId: string) {
    return await wishlistAccess.deleteWishlistItemById(itemId, userId)
}

export async function updateWishlistItem(itemId: string, userId: string, itemUpdate: UpdateWishlistItemRequest) {
    return await wishlistAccess.updateWishlistItem(itemId, userId, {
        wishlistItemName: itemUpdate.wishlistItemName,
        wishlistItemDescription: itemUpdate.wishlistItemDescription,
        wishlistItemLink: itemUpdate.wishlistItemLink,
        complete: itemUpdate.complete
    })
}

export async function getItemUploadUrl(itemId: string): Promise<string> {
    return await wishlistAccess.getItemUploadUrl(itemId)
}