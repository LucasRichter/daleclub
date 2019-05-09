import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import { Box } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import Axios from 'axios'

export default class listaaniversario extends Component {
  static propTypes = {
    event: PropTypes.string
  }

  static defaultProps = {
    events: []
  }

  async getInitialProps ({ pathname, asPath, query: { id } }) {
    const res = await Axios.get('/api/events')
    return { events: res.data, asPath, pathname }
  }

  state = {
    event: this.props.event,
    email: '',
    birthday_name: '',
    names: [],
    birthday: ''
  }

  render() {
    console.log('props', this.props)
    return (
      <main>
        <PageHead
          title='Daleclub | Lista Aniversário'
          description='Lista Aniversário'
        />

        <Box
          mt='20px'
          mx={['20px', '80px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Lista Aniversário'
            />
          </Box>
        </Box>

      </main>
    )
  }
}
