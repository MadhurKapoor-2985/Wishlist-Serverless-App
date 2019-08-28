export interface UpdateWishlistItemRequest {
    wishlistItemName: string,
    wishlistItemDescription: string,
    wishlistItemLink?: string,
    complete: boolean
}