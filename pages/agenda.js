import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import { Flex, Box } from '@rebass/grid'
import Button from '@material-ui/core/Button'
import Axios from 'axios'
import Text from '../components/Text'
import SectionTitle from '../components/SectionTitle'
import styled from 'styled-components'
import mediaQueries from '../helpers/mediaQueries'

const Image = styled.img`
  max-width: 100%;

  @media ${mediaQueries.laptop} {
    max-width: unset;
  }
`

class Agenda extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired
  }

  static defaultProps = {
    event: []
  }

  static async getInitialProps ({ query: { id } }) {
    const res = await Axios.get('/api/events/' + id)
    return { event: res.data }
  }

  render () {
    const { event } = this.props
    const { party, description, cover, permalink, edition, has_birthday_lists: hasBirhday, has_guests: hasGuests } = event

    return (
      <main>
        <PageHead
          title={`Daleclub | ${party}`}
          description={description}
        />

        <Flex
          css={{ backgroundColor: 'white' }}
          p={['20px', '40px 80px']}
          flexDirection={['column', 'row']}
        >
          <Box>
            <Image
              src={cover}
              alt={party}
            />
            <Box mt='20px' width='100%'>
              <Button disabled={!hasGuests} fullWidth color='secondary' variant='contained' size='large'>
                {hasGuests ? 'Nome na lista' : 'Nome encerrado'}
              </Button>
            </Box>

            <Box mt='20px' width='100%'>
              <Button disabled={!hasBirhday} href={`/listaaniversario/${permalink}`} fullWidth variant='contained' color='primary' size='large'>
                {hasBirhday ? 'Lista aniversário' : 'Aniversário encerrado'}
              </Button>
            </Box>
          </Box>

          <Box
            mt={['20px', '0']}
            mx={['0', '30px']}
          >
            <Box css={{ workBreak: 'break-all' }}>
              <SectionTitle
                bottom
                title={`${party} // ${edition}`}
              />

              <Text
                m='20px 0'
                opaque
                color='#5d5d5d'
                styles={{ workBreak: 'break-all' }}
              >
                {description}
              </Text>
            </Box>
          </Box>

        </Flex>

      </main>
    )
  }
}

export default Agenda
