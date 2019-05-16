import React, { Component } from 'react'
import PageHead from '../components/PageHead'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import JsxParser from 'react-jsx-parser'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Image = styled.div`
  background-image: url(http://www.sinnersclub.com.br/uploads/event/cover_image/706/main_cartaz.png);
  background-size: cover;
  background-position: center;
  width: 400px;
  max-width: 100%;
  height: 400px;
`

class IndexPage extends Component {
  static propTypes = {
    currentConfig: PropTypes.object
  }
  render () {
    const { currentConfig } = this.props
    return (
      <main>
        <PageHead
          title='Daleclub | A Casa'
          description='A Casa'
        />

        <Box
          css={{ backgroundColor: 'white' }}
          p={['20px', '40px 200px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='A Casa'
              dark
            />
          </Box>

          <Flex flexDirection={['column', 'row']}>

            <Box mb={['20px', '']}>
              <Image />
            </Box>

            <Box ml='20px' >
              <JsxParser
                jsx={currentConfig.home_text}
              />
            </Box>
          </Flex>

        </Box>

      </main>
    )
  }
}

export default IndexPage
