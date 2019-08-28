import { apiEndpoint } from '../config'
import { WishlistItem } from '../types/WishlistItem';
import { CreateWishlistItemRequest } from '../types/CreateWishlistItemRequest';
import Axios from 'axios'
import { UpdateWishlistItemRequest } from '../types/UpdateWishlistItemRequest';

export async function getWishlistItems(idToken: string): Promise<WishlistItem[]> {
  console.log('Fetching Wishlist Items')

  const response = await Axios.get(`${apiEndpoint}/wishlistitems`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Wishlist Items:', response.data)
  return response.data.items
}

export async function createWishlistItem(
  idToken: string,
  newItem: CreateWishlistItemRequest
): Promise<WishlistItem> {
  const response = await Axios.post(`${apiEndpoint}/wishlistitems`,  JSON.stringify(newItem), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchWishlistItem(
  idToken: string,
  wishlistItemId: string,
  updatedItem: UpdateWishlistItemRequest
): Promise<void> {
   
  await Axios.patch(`${apiEndpoint}/wishlistitems/${wishlistItemId}`, JSON.stringify(updatedItem), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteWishlistItem(
  idToken: string,
  wishlistItemId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/wishlistitems/${wishlistItemId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  wishlistItemId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/wishlistitems/${wishlistItemId}/uploadUrl`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  var options = {
    headers: {
      'Content-Type': 'text/plain'
    }
  };

  await Axios.put(uploadUrl, file, options)
}

export async function getWishlistItemById(idToken: string, wishlistItemId: string): Promise<WishlistItem> {
    console.log('Fetching Wishlist Item for id,', wishlistItemId)
  
    const response = await Axios.get(`${apiEndpoint}/wishlistitems/${wishlistItemId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
    })
    console.log('Wishlist Item:', response.data)
    return response.data.item
  }
