import React, { Component } from 'react'
import PageHead from '../../components/PageHead'
import { Box } from '@rebass/grid'
import Router from 'next/router'
import { withSnackbar } from 'notistack'

class IndexPage extends Component {
  componentDidMount() {
    const token = localStorage.getItem('DALECLUB_TOKEN')

    if (!token) {
      Router.push('/admin')
    }
  }

  onChange = e => {
    e.preventDefault()
    const { id, value } = e.target

    this.setState({ [id]: value })
  }

  render () {
    return (
      <main>
        <PageHead
          title='Daleclub | Dashboard'
          description='Login'
        />

        <Box
          css={{ backgroundColor: 'white', textAlign: 'center' }}
          m={['20px 0', '180px 0 0']}
          p={['20px', '40px 80px']}
        >
          oi
        </Box>

      </main>
    )
  }
}

export default withSnackbar(IndexPage)
