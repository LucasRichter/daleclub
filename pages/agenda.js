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
import GuestForm from '../components/GuestForm'

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

  state = {
    open: false
  }

  static async getInitialProps ({ query: { id } }) {
    const res = await Axios.get('/api/events?permalink=' + id)
    return { event: res.data[0] }
  }

  render () {
    const { event } = this.props
    const { _id, party, description, cover, permalink, edition, lists, guests } = event

    return (
      <main>
        <PageHead
          title={`Daleclub | ${party}`}
          description={description}
        />

        <Flex
          css={{ backgroundColor: 'white' }}
          m={['20px 0', '180px 0 0']}
          p={['20px', '40px 80px']}
          flexDirection={['column', 'row']}
        >
          <Box>
            <Image
              src={`/${cover.path}`}
              alt={party}
            />
            <Box mt='20px' width='100%'>
              <Button onClick={() => this.setState({ open: true })} disabled={!guests} fullWidth color='secondary' variant='contained' size='large'>
                {guests ? 'Nome na lista' : 'Nome encerrado'}
              </Button>
            </Box>

            <Box mt='20px' width='100%'>
              <Button disabled={!lists} href={`/lista/${permalink}`} fullWidth variant='contained' color='primary' size='large'>
                {lists ? 'Lista aniversário' : 'No Hay'}
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
                style={{ wordBreak: 'break-all' }}
              >
                {description}
              </Text>
            </Box>
          </Box>

        </Flex>

        <GuestForm
          open={this.state.open}
          party={_id}
          onClose={() => this.setState({ open: false })}
        />
      </main>
    )
  }
}

export default Agenda
