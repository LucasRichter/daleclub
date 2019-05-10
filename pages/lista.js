import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import { Box } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { getEvents } from '../services/eventsServices'

export default class lista extends Component {
  static propTypes = {
    event: PropTypes.string,
    events: PropTypes.array
  }

  static defaultProps = {
    events: []
  }

  static async getInitialProps({ query: { event } }) {
    const res = await getEvents()
    return { events: res.data, event }
  }

  state = {
    event: '',
    email: '',
    birthday_name: '',
    names: [],
    birthday: ''
  }

  componentDidMount() {
    const { event, events } = this.props

    if (event) {
      console.log(events, event)
      const find = events.find(e => e.permalink === event)
      if (find) {
        this.setState({ event: find._id })
      }
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { event } = this.state
    const { events } = this.props

    return (
      <main>
        <PageHead
          title='Daleclub | Lista Aniversário'
          description='Lista Aniversário'
        />

        <Box
          mt='20px'
          mx={['20px', '80px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Lista Aniversário'
            />
          </Box>

          <FormControl variant='filled' >
            <InputLabel htmlFor='event'>Festa</InputLabel>
            <Select
              value={event}
              onChange={this.handleChange}
              input={<FilledInput name='event' id='event' />}
            >
              {events.map(e => (
                <MenuItem key={e._id} value={e._id}>{e.party}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

      </main>
    )
  }
}
