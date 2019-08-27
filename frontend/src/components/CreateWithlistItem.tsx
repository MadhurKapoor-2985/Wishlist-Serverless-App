import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { createWishlistItem } from '../api/wishlist-api'
import Auth from '../auth/Auth'

interface CreateWishlistItemProps {
  auth: Auth
}

interface CreateWishlistItemState {
  wishlistItemName: string
  wishlistItemDescription: string
  wishlistItemLink: string,
  uploadingItem: boolean
}

export class CreateWishlistItem extends React.PureComponent<
  CreateWishlistItemProps,
  CreateWishlistItemState
> {
  state: CreateWishlistItemState = {
    wishlistItemName: '',
    wishlistItemDescription: '',
    wishlistItemLink: '',
    uploadingItem: false
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ wishlistItemName: event.target.value })
  }

  handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ wishlistItemDescription: event.target.value })
  }

  handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({wishlistItemLink: event.target.value})
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (!this.state.wishlistItemName || !this.state.wishlistItemDescription || !this.state.wishlistItemLink) {
        alert('Name, description and link should be provided')
        return
      }

      this.setUploadState(true)
      const wishlistItem = await createWishlistItem(this.props.auth.getIdToken(), {
        wishlistItemName: this.state.wishlistItemName,
        wishlistItemDescription: this.state.wishlistItemDescription,
        wishlistItemLink: this.state.wishlistItemLink
      })

      console.log('Created Item', wishlistItem)

      alert('Item was created!')
    } catch (e) {
      alert('Could not create item: ' + e.message)
    } finally {
      this.setUploadState(false)
    }
  }

  setUploadState(uploadingItem: boolean) {
    this.setState({
      uploadingItem
    })
  }

  render() {
    return (
      <div>
        <h1>Create new WishList Item</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Wishlist Item name"
              value={this.state.wishlistItemName}
              onChange={this.handleNameChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Wishlist Item description"
              value={this.state.wishlistItemDescription}
              onChange={this.handleDescriptionChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Link</label>
            <input
              placeholder="Wishlist Item link"
              value={this.state.wishlistItemLink}
              onChange={this.handleLinkChange}
            />
          </Form.Field>
          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {
    return (
      <Button loading={this.state.uploadingItem} type="submit">
        Create
      </Button>
    )
  }
}
