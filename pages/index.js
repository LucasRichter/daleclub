import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import { Flex, Box } from '@rebass/grid'
import Event from '../components/Event'
import SectionTitle from '../components/SectionTitle'
import GuestForm from '../components/GuestForm'
import { getEvents } from '../services/eventsServices'

class IndexPage extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired
  }

  static defaultProps = {
    events: []
  }

  static async getInitialProps () {
    const events = await getEvents()
    return { events }
  }

  state = {
    open: false,
    party: ''
  }

  render () {
    const { events } = this.props

    return (
      <main>
        <PageHead
          title='Daleclub'
          description='Daleclub'
        />

        <Box
          mt='20px'
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
                onGuest={party => this.setState({ open: true, party: party._id })}
              />
            ))}
          </Flex>

          <GuestForm
            open={this.state.open}
            party={this.state.party}
            onClose={() => this.setState({ open: false })}
          />
        </Box>

      </main>
    )
  }
}

export default IndexPage
