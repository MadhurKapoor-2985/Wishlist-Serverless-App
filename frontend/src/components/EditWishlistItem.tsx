import * as React from 'react'
import { Form, Button, Checkbox, Grid, Loader } from 'semantic-ui-react'
import { patchWishlistItem, getWishlistItemById } from '../api/wishlist-api'
import Auth from '../auth/Auth'
import { CheckBox } from 'react-native';

interface EditWishlistItemProps {
    match: {
        params: {
          wishlistItemId: string
        }
      }
      auth: Auth
}

interface EditWishlistItemState {
  wishlistItemName: string
  wishlistItemDescription: string
  wishlistItemLink?: string
  complete: boolean
  loadingItem: boolean
}

export class EditWishlistItem extends React.PureComponent<
  EditWishlistItemProps,
  EditWishlistItemState
> {
  state: EditWishlistItemState = {
    wishlistItemName: '',
    wishlistItemDescription: '',
    wishlistItemLink: '',
    complete: false,
    loadingItem: true
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

  handleCompleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({complete: event.target.checked })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (!this.state.wishlistItemName || !this.state.wishlistItemDescription || !this.state.wishlistItemLink) {
        alert('Name, description and link should be provided')
        return
      }

    
      const wishlistItem = await patchWishlistItem(this.props.auth.getIdToken(), this.props.match.params.wishlistItemId,{
        wishlistItemName: this.state.wishlistItemName,
        wishlistItemDescription: this.state.wishlistItemDescription,
        wishlistItemLink: this.state.wishlistItemLink,
        complete: this.state.complete
      })

      console.log('Updated Item', wishlistItem)

      alert('Item was Updated!')
    } catch (e) {
      alert('Could not update item: ' + e.message)
    } finally {
      
    }
  }

  async componentDidMount() {
    try {
      const wishlistItem = await getWishlistItemById(this.props.auth.getIdToken(), this.props.match.params.wishlistItemId)
      
      this.setState({
        wishlistItemName: wishlistItem.wishlistItemName,
        wishlistItemDescription: wishlistItem.wishlistItemDescription,
        wishlistItemLink: wishlistItem.wishlistItemLink,
        complete: wishlistItem.complete,
        loadingItem: false
      })
    } catch (e) {
      alert(`Failed to fetch items: ${e.message}`)
    }
  }

  renderWishlistItem() {
    if (this.state.loadingItem) {
        return this.renderLoading()
      }
  
      return this.renderItems()
    }
  
    renderLoading() {
        return (
          <Grid.Row>
            <Loader indeterminate active inline="centered">
              Loading Item
            </Loader>
          </Grid.Row>
        )
      }
    
      renderButton() {
        return (
          <Button  type="submit">
            Update
          </Button>
        )
      }

      renderItems() {
        return (
            <div>
              <h1>Update WishList Item</h1>
      
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
                <Form.Field>
                  <label>IsComplete</label>
                  <input
                    type="checkbox"
                    checked={this.state.complete}
                    onChange={this.handleLinkChange}
                  />
                </Form.Field>
                {this.renderButton()}
              </Form>
            </div>
          )

      }


  render() {

    return (
        <div>
            {this.renderWishlistItem()}
       </div>
    )
    
  }


}
