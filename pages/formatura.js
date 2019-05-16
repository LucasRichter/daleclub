import React, { Component } from 'react'
import PageHead from '../components/PageHead'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import JsxParser from 'react-jsx-parser'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getCollegeImage } from '../services/homeServices'

const Image = styled.div`
  background-image: url(${p => p.url});
  background-size: cover;
  background-position: center;
  width: 400px;
  max-width: 100%;
  height: 400px;
`

class IndexPage extends Component {
  static propTypes = {
    currentConfig: PropTypes.object,
    image: PropTypes.object
  }

  static defaultProps = {
    image: { file: {} }
  }

  static async getInitialProps ({ currentConfig }) {
    const image = await getCollegeImage()
    return { image }
  }

  render () {
    const { currentConfig, image } = this.props
    return (
      <main>
        <PageHead
          title='Daleclub | Formatura/100 dias'
          description='Formatura/100 dias'
        />

        <Box
          css={{ backgroundColor: 'white' }}
          p={['20px', '40px 200px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Formatura/100 dias'
              dark
            />
          </Box>

          <Flex flexDirection={['column', 'row']}>

            <Box mb={['20px', '']}>
              <Image url={image && `/${image.file.path}`} />
            </Box>

            <Box ml='20px' >
              <JsxParser
                jsx={currentConfig.college_text}
              />
            </Box>
          </Flex>

        </Box>

      </main>
    )
  }
}

export default IndexPage
