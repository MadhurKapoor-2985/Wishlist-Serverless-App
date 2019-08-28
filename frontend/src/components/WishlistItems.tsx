import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import {  deleteWishlistItem, getWishlistItems, patchWishlistItem } from '../api/wishlist-api'
import Auth from '../auth/Auth'
import { WishlistItem } from '../types/WishlistItem'

interface WishlistItemsProps {
  auth: Auth
  history: History
}

interface WishlistItemsState {
  wishlistItems: WishlistItem[]
  loadingWishlistItems: boolean
}

export class WishlistItems extends React.PureComponent<WishlistItemsProps, WishlistItemsState> {
  state: WishlistItemsState = {
    wishlistItems: [],
    loadingWishlistItems: true
  }

  handleCreateWishlistItem = () => {
    this.props.history.push(`/wishlistitems/create`)
  }

  onEditButtonClick = (itemid: string) => {
    this.props.history.push(`/wishlistitems/${itemid}/edit`)
  }

  onUploadButtonClick = (itemid: string) => {
    this.props.history.push(`/wishlistitems/${itemid}/upload`)
  }

  onWishlistItemDelete = async (wishlistItemId: string) => {
    try {
      await deleteWishlistItem(this.props.auth.getIdToken(), wishlistItemId)
      this.setState({
        wishlistItems: this.state.wishlistItems.filter(item => item.wishlistItemId != wishlistItemId)
      })
    } catch {
      alert('Item deletion failed')
    }
  }

  onWishlistItemCheck = async (pos: number) => {
    try {
      const item = this.state.wishlistItems[pos]
      await patchWishlistItem(this.props.auth.getIdToken(), item.wishlistItemId, {
        wishlistItemName: item.wishlistItemName,
        wishlistItemDescription: item.wishlistItemDescription,
        wishlistItemLink:  item.wishlistItemLink,
        complete: !item.complete
      })
      this.setState({
        wishlistItems: update(this.state.wishlistItems, {
          [pos]: { complete: { $set: !item.complete } }
        })
      })
    } catch {
      alert('Item Updation failed')
    }
  }

  async componentDidMount() {
    try {
      const wishlistItems = await getWishlistItems(this.props.auth.getIdToken())
      
      this.setState({
        wishlistItems,
        loadingWishlistItems: false
      })
    } catch (e) {
      alert(`Failed to fetch items: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">My Wish List</Header>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateWishlistItem}
        >
          Add Item to Wishlist
        </Button>

        <Divider clearing />

         {this.renderWishlistItems()}
      </div>
    )
  }


renderWishlistItems() {
    if (this.state.loadingWishlistItems) {
      return this.renderLoading()
    }

    return this.renderItems()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Items
        </Loader>
      </Grid.Row>
    )
  }

  renderItems() {
    return (
      <Grid padded>
        {this.state.wishlistItems.map((item, pos) => {
          return (
            <Grid.Row key={item.wishlistItemId}>
              <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => this.onWishlistItemCheck(pos)}
                  checked={item.complete}
                />
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {item.wishlistItemName} 
               </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {item.wishlistItemDescription}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {item.wishlistItemLink}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onUploadButtonClick(item.wishlistItemId)}
                >
                  <Icon name="upload" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(item.wishlistItemId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onWishlistItemDelete(item.wishlistItemId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {item.imageUrl && (
                <Image src={item.imageUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

 
}
