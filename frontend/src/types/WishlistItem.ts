export interface WishlistItem {
    userId: string,
    wishlistItemId: string,
    createdDate: string,
    wishlistItemName: string,
    wishlistItemDescription: string,
    wishlistItemLink?: string,
    complete: boolean,
    imageUrl?: string
}