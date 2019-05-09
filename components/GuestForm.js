import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default class GuestForm extends React.Component {
  static propTypes = {
    party: PropTypes.string.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func
  }

  state = {
    email: '',
    names: []
  }

  onSubmit = async () => {

  }

  onChange = e => {
    e.preventDefault()
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  render() {
    const { open, onClose } = this.props
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Nome na lista</DialogTitle>
        <DialogContent>
          <TextField
            onChange={this.onChange}
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
              Cancelar
          </Button>
          <Button onClick={this.onSubmit} color='primary'>
              Enviar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
