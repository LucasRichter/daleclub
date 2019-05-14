import React, { Component } from 'react'
import PageHead from '../../components/PageHead'
import { Box } from '@rebass/grid'
import { H1 } from '../../components/Title'
import { TextField, Button } from '@material-ui/core'
import Router from 'next/router'
import { withSnackbar } from 'notistack'
import Axios from 'axios'
import PropTypes from 'prop-types'

class IndexPage extends Component {
  static propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired
  }

  componentDidMount() {
    const token = localStorage.getItem('DALECLUB_TOKEN')

    if (token) {
      Router.push('/admin/dashboard')
    }
  }

  state = {
    email: '',
    password: ''
  }

  onSubmit = () => {
    const { enqueueSnackbar } = this.props
    Axios.post('/api/auth', this.state)
      .then(({ data }) => {
        localStorage.setItem('DALECLUB_TOKEN', data.token)
        Router.push('/admin/dashboard')
        enqueueSnackbar('Logado com sucesso!', { variant: 'success' })
      })
      .catch(() => enqueueSnackbar('Dados incorretos!', { variant: 'error' }))
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
          title='Daleclub | Admin'
          description='Login'
        />

        <Box
          css={{ backgroundColor: 'white', textAlign: 'center' }}
          m={['20px 0', '180px 0 0']}
          p={['20px', '40px 80px']}
        >
          <H1 centered>
            Admin area
          </H1>

          <Box my='20px'>
            <TextField
              onChange={this.onChange}
              autoFocus
              margin='dense'
              id='email'
              type='email'
              label='E-mail'
            />
          </Box>
          <Box my='20px'>
            <TextField
              onChange={this.onChange}
              margin='dense'
              id='password'
              type='password'
              label='Senha'
            />
          </Box>
          `<Button variant='contained' onClick={this.onSubmit} color='primary' size='large'>
                Entrar
          </Button>`
        </Box>

      </main>
    )
  }
}

export default withSnackbar(IndexPage)
