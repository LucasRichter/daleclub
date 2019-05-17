import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import SectionTitle from '../components/SectionTitle'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { getEvents, postList } from '../services/eventsServices'
import TextField from '@material-ui/core/TextField'
import { Flex, Box } from '@rebass/grid'
import { MinusCircle, PlusCircle } from 'react-feather'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import { H2 } from '../components/Title'
import FormControl from '@material-ui/core/FormControl'
import { withSnackbar } from 'notistack'
import InputMask from '../components/InputMask'

class lista extends Component {
  static propTypes = {
    event: PropTypes.string,
    events: PropTypes.array,
    enqueueSnackbar: PropTypes.func
  }

  static defaultProps = {
    events: []
  }

  static async getInitialProps({ query: { event } }) {
    const events = await getEvents({ lists: true })
    return { events, event }
  }

  state = {
    event: '',
    email: '',
    cpf: '',
    birthday_name: '',
    guests: {
      convidado: ''
    },
    birthday: ''
  }

  componentDidMount() {
    const { event, events } = this.props

    if (event) {
      const find = events.find(e => e.permalink === event)
      if (find) {
        this.setState({ event: find._id, birthday: moment(find.date).format('YYYY-MM-DD') })
      }
    }
  }

  onSubmit = async () => {
    const { guests } = this.state
    const { enqueueSnackbar } = this.props

    this.setState({ loading: true })
    const names = Object.values(guests).filter(n => n)
    try {
      await postList({
        ...this.state,
        names
      })

      enqueueSnackbar('Nome na lista confirmado!', { variant: 'success' })
    } catch (error) {
      if (error.response) {
        let {message, errors} = error.response.data
        if (errors) {
          message = Object.values(errors).join(', ')
        }
        enqueueSnackbar(message, { variant: 'error' })
      }
    }
  }

  add = () => {
    const { current, guests } = this.state
    const next = current + 1
    this.setState({
      current: next,
      guests: {
        ...guests,
        [`convidado [${next}]`]: ''
      }
    })
  }

  remove = id => {
    const guests = { ...this.state.guests }
    delete guests[id]
    this.setState({ guests })
  }

  onChange = e => {
    e.preventDefault()
    const { guests } = this.state
    const { id, name, value } = e.target
    const key = id || name

    if (key.includes('convidado')) {
      this.setState({
        guests: {
          ...guests,
          [key]: value
        }
      })
    } else {
      this.setState({ [key]: value })
    }
  }

  render() {
    const { event, guests, birthday } = this.state
    const { events } = this.props

    return (
      <main>
        <PageHead
          title='Daleclub | Lista Aniversário'
          description='Lista Aniversário'
        />

        <Box
          css={{ backgroundColor: 'white' }}
          p={['20px', '40px 120px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Lista'
            />
          </Box>

          <Flex
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            mx='auto'
            css={{ maxWidth: '500px' }}
          >
            <H2>
              Preencha sua lista abaixo:
            </H2>

            <FormControl style={{ width: '100%' }} >
              <InputLabel htmlFor='event'>Festa</InputLabel>
              <Select
                placeholder='Festa'
                value={event}
                onChange={this.onChange}
                inputProps={{
                  name: 'event',
                  id: 'event'
                }}
              >
                {events.map(e => (
                  <MenuItem key={e._id} value={e._id}>{e.party}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              onChange={this.onChange}
              autoFocus
              margin='dense'
              id='email'
              label='E-mail'
              type='email'
              fullWidth
            />

            <InputMask
              onChange={this.onChange}
              margin='dense'
              id='cpf'
              label='CPF'
              mask='999.999.999-99'
              maskChar={null}
              fullWidth
            />

            <TextField
              onChange={this.onChange}
              margin='dense'
              id='birthday_name'
              label='Nome do aniversiarante'
              fullWidth
            />

            <TextField
              margin='dense'
              id='birthday'
              onChange={this.onChange}
              value={birthday}
              fullWidth
              label='Data de aniversário'
              type='date'
              InputLabelProps={{
                shrink: true
              }}
            />

            {Object.keys(guests).map((key, index) => (
              <Flex
                key={key}
                alignItems='center'
                justifyContent='center'
                css={{ width: '100%' }}
              >
                <TextField
                  onChange={this.onChange}
                  autoFocus
                  margin='dense'
                  id={key}
                  label={`Convidado ${index || ''}`}
                  fullWidth
                />
                {key !== 'convidado' &&
                <MinusCircle style={{ margin: '0 20px' }} onClick={() => this.remove(key)} />
                }
              </Flex>
            ))
            }
            <Button variant='outlined' color='inherit' onClick={this.add} style={{ width: '60%', margin: '20px auto 0' }}>
              <PlusCircle style={{ margin: '0 20px' }} /> Adicionar convidado
            </Button>

            <Box mt='20px'>
              <Button variant='contained' onClick={this.onSubmit} color='primary' size='large'>
                Enviar lista
              </Button>
            </Box>
          </Flex>

        </Box>

      </main>
    )
  }
}

export default withSnackbar(lista)
