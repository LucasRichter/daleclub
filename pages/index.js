import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import { Flex, Box } from '@rebass/grid'
import Event from '../components/Event'
import Axios from 'axios'
import SectionTitle from '../components/SectionTitle'

class IndexPage extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired
  }

  static defaultProps = {
    events: []
  }

  static async getInitialProps () {
    const res = await Axios.get('/api/events', { baseUrl: process.env.API_DOMAIN })
    return { events: res.data }
  }

  render () {
    const { events } = this.props
    return (
      <main>
        <PageHead
          title='Daleclub'
          description='Daleclub'
        />

        {/* <Image /> */}

        <Box
          mt='80px'
          mx={['20px', '80px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Agenda'
              dark
            />
          </Box>

          <Flex
            alignItems='flex-start'
            flexWrap='wrap'

          >
            {events.map((event, index) => (
              <Event
                index={index + 1}
                key={event.party}
                event={event}
              />
            ))}
          </Flex>
        </Box>

      </main>
    )
  }
}

export default IndexPage
