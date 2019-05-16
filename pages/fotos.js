import React, { Component } from 'react'
import PageHead from '../components/PageHead'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import PropTypes from 'prop-types'
import Axios from 'axios'
import styled from 'styled-components'

const Image = styled(Box)`
  height: 320px;
  width: 320px;
  background-image: url(${p => p.url});
  background-size: cover;
  background-position: center;
`

class IndexPage extends Component {
  static propTypes = {
    images: PropTypes.array
  }

  static defaultProps = {
    images: []
  }

  static async getInitialProps () {
    const params = {
      access_token: '13616104430.1f3ab73.9a567bea06fd4bd99a0392a6dc28d5e0',
      count: 12
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
          p={['20px', '0 200px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Fotos'
              dark
            />

            <Flex alignItems='center' justifyContent='space-between' flexWrap='wrap'>
              {images.map(({ caption, id, images }) => {
                const image = images.low_resolution
                return (
                  <Image
                    m='20px 0'
                    key={id}
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
