import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import { Flex, Box } from '@rebass/grid'
import Button from '@material-ui/core/Button'
import Axios from 'axios'
import Text from '../components/Text'
import SectionTitle from '../components/SectionTitle'

class Agenda extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired
  }

  static defaultProps = {
    event: []
  }

  static async getInitialProps ({ query: { id } }) {
    const res = await Axios.get(process.env.API_DOMAIN + '/api/events/' + id)
    return { event: res.data }
  }

  render () {
    const { event } = this.props
    const { party, description, cover, edition, has_birthday_lists: hasBirhday, has_guests: hasGuests } = event

    return (
      <main>
        <PageHead
          title={`Daleclub | ${party}`}
          description={description}
        />

        <Flex
          m='80px'
          flexDirection={['column', 'row']}
        >
          <Box>
            <img
              src={cover}
              alt={party}
            />
            {hasGuests && <Box mt='20px'>
              <Button fullWidth color='secondary' variant='contained' size='large'>
        Nome na lista
              </Button>
            </Box>}
            {hasBirhday &&
            <Box mt='20px'>
              <Button fullWidth variant='contained' color='primary' size='large'>
        Lista aniversário
              </Button>
            </Box>
            }
          </Box>

          <Box mx={['0', '30px']}>
            <Box>
              <SectionTitle
                title={`${party} // ${edition}`}
              />

              <Text m='20px 0' opaque color='white'>
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
