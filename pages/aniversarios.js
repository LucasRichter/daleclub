import React, { Component } from 'react'
import PageHead from '../components/PageHead'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import JsxParser from 'react-jsx-parser'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getBirthdayImage } from '../services/homeServices'

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
    const image = await getBirthdayImage()
    return { image }
  }

  render () {
    const { currentConfig, image } = this.props
    return (
      <main>
        <PageHead
          title='Daleclub | Aniversários'
          description='Aniversários'
        />

        <Box
          css={{ backgroundColor: 'white' }}
          p={['20px', '40px 120px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Aniversários'
              dark
            />
          </Box>

          <Flex flexDirection={['column', 'row']}>

            <Box mb={['20px', '']}>
              <Image url={image && `${image.file.path}`} />
            </Box>

            <Box ml='20px' >
              {currentConfig.birthday_text &&
              <JsxParser
                jsx={currentConfig.birthday_text}
              />
              }

              <Box mt='20px'>
                <Link href='/lista'>
                  <Button color='secondary' variant='contained' size='large'>
                    Enviar lista
                  </Button>
                </Link>
              </Box>
            </Box>
          </Flex>

        </Box>

      </main>
    )
  }
}

export default IndexPage
