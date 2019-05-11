import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import { Flex, Box } from '@rebass/grid'
import Event from '../components/Event'
import SectionTitle from '../components/SectionTitle'
import GuestForm from '../components/GuestForm'
import { getEvents } from '../services/eventsServices'
import Slider from 'react-slick'
import styled from 'styled-components'

const Slide = styled.div`
  min-height: 150px;
  background-image: url(${p => p.url});
  width: 100%;
  background-size: cover;
  background-position: center;
`

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
    var settings = {
      dots: true,
      infinite: true,
      arrows: false,
      lazyLoad: 'ondemand',
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    return (
      <main>
        <PageHead
          title='Daleclub'
          description='Daleclub'
        />

        <Slider {...settings}>
          <Slide url='https://scontent.fpoa4-1.fna.fbcdn.net/v/t1.0-9/45455281_2281206948616163_7889246965836283904_o.jpg?_nc_cat=111&_nc_ht=scontent.fpoa4-1.fna&oh=4e462d442f142f308cff2b25f73e91b3&oe=5D6C31F6' />
          <Slide url='https://scontent.fpoa4-1.fna.fbcdn.net/v/t1.0-9/45455281_2281206948616163_7889246965836283904_o.jpg?_nc_cat=111&_nc_ht=scontent.fpoa4-1.fna&oh=4e462d442f142f308cff2b25f73e91b3&oe=5D6C31F6' />
        </Slider>

        <Box
          mt='20px'
          mx={['20px', '200px']}
        >

          <Box mb='40px'>
            <SectionTitle
              title='Agenda'
              dark
            />
          </Box>

          <Flex
            alignItems='flex-start'
            justifyContent={['center', 'space-between']}
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
