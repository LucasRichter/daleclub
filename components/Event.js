import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { H2 } from './Title'
import { Box } from '@rebass/grid'
import Text from './Text'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

const Container = styled(Box)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-basis: 0;
  margin: 0 10px;
  transition: all .300s ease-in;
  transform: translateY(20%);
  opacity: 0;

  ${p => p.show && css`
    opacity: 1;
    transform: translateY(0);
  `}
`

const Image = styled.img`
  width: 100%;
`

export default class Event extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  }

  static defaultProps = {
    index: 1
  }

  state = {
    show: false
  }

  componentDidMount() {
    setTimeout(() => this.setState({ show: true }), 300 * this.props.index)
  }

  render() {
    const { event } = this.props
    const { party, date, cover, permalink, has_birthday_lists: hasBirhday, has_guests: hasGuests } = event

    return (
      <Container
        show={this.state.show}
      >
        <Link
          href={`/agenda?id=${permalink}`}
          as={`/agenda/${permalink}`}
        >
          <Box css={{ cursor: 'pointer' }}>
            <H2 centered fontSize='15px' color='white'>
              <strong>{party.toUpperCase()}</strong>
            </H2>

            <Box mb='20px' css={{
              textTransform: 'uppercase',
              opacity: '0.8'
            }}>
              <Text
                fontSize='12px'
                color='white'
              >
                {moment(date).format('dddd, DD.MM.YYYY')}
              </Text>
            </Box>
            <Image
              src={cover}
              alt={party}
            />
          </Box>

        </Link>
        {hasGuests &&
          <Box mt='20px' width='100%'>
            <Button fullWidth color='secondary' variant='contained' size='large'>
          Nome na lista
            </Button>
          </Box>
        }
        {hasBirhday &&
          <Box mt='20px' width='100%'>
            <Button fullWidth variant='contained' color='primary' size='large'>
          Lista aniversário
            </Button>
          </Box>
        }
      </Container>
    )
  }
}
