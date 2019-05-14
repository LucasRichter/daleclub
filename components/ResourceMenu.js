import React, { Component, Fragment } from 'react'
import Router from 'next/router'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import { MoreVertical } from 'react-feather'
import Axios from 'axios'

class ResourceMenu extends Component {
  static propTypes = {
    resource: PropTypes.string,
    item: PropTypes.object,
    extraMenus: PropTypes.array
  }

  static defaultProps = {
    extraMenus: []
  }

  state = {
    anchorEl: null
  }

  headers = {
    'x-access-token': localStorage.getItem('DALECLUB_TOKEN')
  }

  onDelete = async () => {
    const { item, resource } = this.props
    const deleted = confirm('Você tem certeza que deseja deletar este item?')

    if (deleted) {
      await Axios.delete(`/api/${resource}/${item._id}`, { headers: this.headers })
      Router.push(`/admin/dashboard/${resource}/all`)
    }
  }

  get menus() {
    const { resource, extraMenus, item } = this.props
    return [
      {
        onClick: () => Router.push(`/admin/dashboard/${resource}/edit/${item._id}`),
        text: 'Editar'
      },
      {
        onClick: this.onDelete,
        text: 'Deletar'
      },
      ...extraMenus
    ]
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state

    return (
      <Fragment>
        <MoreVertical
          onClick={this.handleClick}
        />

        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.menus.map(menu => (
            <MenuItem key={menu.text} onClick={() => {
              this.handleClose()
              menu && menu.onClick()
            }}>{menu.text}</MenuItem>
          ))}
        </Menu>
      </Fragment>
    )
  }
}

export default ResourceMenu
