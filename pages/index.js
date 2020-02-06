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
import { getCarouselImages } from '../services/homeServices'

const Slide = styled.div`
  min-height: 120px;
  background-image: url(${p => p.url});
  width: 100%;
  background-size: cover;
  background-position: center;
`

class IndexPage extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired
  }

  static defaultProps = {
    events: [],
    images: []
  }

  static async getInitialProps ({ currentConfig }) {
    const events = await getEvents({ limit: currentConfig.number_events })
    const images = await getCarouselImages()
    return { events, images }
  }

  state = {
    open: false,
    party: ''
  }

  render () {
    const { events, images } = this.props
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
          {images.map(image => (
            <Slide key={image._id} url={image.file && `/${image.file.path}`} />
          ))}
        </Slider>

        <Box
          mt='20px'
          mx={['20px', '120px']}
        >

          <Box my='40px'>
            <SectionTitle
              title='Agenda'
              white
            />
          </Box>

          <Flex
            alignItems='flex-start'
            flexDirection={['column', 'row']}
            justifyContent='center'
            pb='40px'
            css={{ borderBottom: '1px solid white' }}
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
