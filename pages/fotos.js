import React, { Component } from 'react'
import PageHead from '../components/PageHead'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import PropTypes from 'prop-types'
import Axios from 'axios'
import InstaImage from '../components/InstaImage'

class IndexPage extends Component {
  static propTypes = {
    images: PropTypes.array
  }

  static defaultProps = {
    images: []
  }

  static async getInitialProps ({ currentConfig }) {
    const params = {
      access_token: '13616104430.1f3ab73.9a567bea06fd4bd99a0392a6dc28d5e0',
      count: currentConfig.instagram_photos
    }

    const res = await Axios.get('https://api.instagram.com/v1/users/self/media/recent', { baseUrl: '', params })
    return { images: res.data.data }
  }

  render () {
    const { images } = this.props
    return (
      <main>
        <PageHead
          title='Daleclub | Fotos'
          description='Fotos'
        />

        <Box
          mt='40px'
          p={['20px', '0 120px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Fotos'
              dark
            />

            <Flex
              alignItems='center'
              justifyContent={['center', 'space-between']}
              flexWrap='wrap'
              pb='40px'
              css={{ borderBottom: '1px solid white' }}
            >
              {images.map(({ caption, id, images }, i) => {
                const image = images.standard_resolution
                return (
                  <InstaImage
                    my='20px'
                    mx={['auto', '0']}
                    key={id}
                    number={i}
                    url={image.url}
                    title={caption && caption.text}
                    caption={caption && caption.text}
                  />
                )
              })}
            </Flex>
          </Box>

        </Box>

      </main>
    )
  }
}

export default IndexPage
