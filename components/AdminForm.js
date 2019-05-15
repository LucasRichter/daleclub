import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@rebass/grid'
import { fields } from '../helpers/adminResources'
import { Button } from '@material-ui/core'
import { H2 } from './Title'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import CheckboxField from './CheckboxField'
import TextField from './TextField'
import styled from 'styled-components'
import draftToHtml from 'draftjs-to-html'
import Axios from 'axios'
import toFormData from 'json-form-data'
import difference from '../helpers/difference'

const Container = styled(Box)`
  width: 100%;

  .demo-editor {
    height: 275px !important;
    border: 1px solid #F1F1F1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }

  .demo-wrapper {
    width: 100% !important;
    display: block !important;
    margin-bottom: 25px !important;
    height: 400px !important;
  }
`

export default class AdminForm extends Component {
  static propTypes = {
    resource: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    item: PropTypes.object
  }

  static defaultProps = {
    item: {}
  }

  headers = {
    'x-access-token': localStorage.getItem('DALECLUB_TOKEN')
  }

  state= {
    ...this.props.item,
    buttonDisabled: false,
    errors: {}
  }

  onChange = e => {
    const { id, value, checked, files } = e.target
    const current = (files && files[0]) || checked || value
    this.setState({ [id]: current,
      errors: {
        ...this.state.errors,
        [id]: ''
      } })
  }

  getField = ({ id, label, type, parseDefaultValue }) => {
    const { errors } = this.state
    const value = this.state[id]
    const defaultProps = {
      margin: 'dense',
      id: id,
      label,
      type: type || 'text',
      onChange: this.onChange,
      error: errors[id],
      errorText: errors[id]
    }

    switch (type) {
      case 'editor':
        return (
          <Editor
            defaultEditorState={parseDefaultValue ? parseDefaultValue(value) : undefined}
            wrapperClassName='demo-wrapper'
            editorClassName='demo-editor'
            onEditorStateChange={editor =>
              this.onChange({ target: { id: id, value: editor } })}
          />
        )
      case 'boolean':
        return (
          <CheckboxField
            id={id}
            onChange={this.onChange}
            label={label}
            checked={value}
          />
        )

      case 'file': {
        return value && value.path
          ? (
            <img src={`/${value.path}`} style={{ maxWidth: '250px' }} />
          )
          : (
            <TextField
              {...defaultProps}
            />
          )
      }

      default:
        return (
          <TextField
            defaultValue={parseDefaultValue ? parseDefaultValue(value) : value}
            {...defaultProps}
          />
        )
    }
  }

  get form() {
    const { resource } = this.props

    return fields[resource].map(field => (
      <Box m='20px' css={{ width: '100%' }} >
        {this.getField(field)}
      </Box>
    ))
  }

  onSubmit = () => {
    const { resource, onSuccess, onError } = this.props
    const state = { ...this.state }
    const allFields = fields[resource]
    let isFormdata = false
    let error = false
    let errors = {}

    for (let field of allFields) {
      let value = state[field.id]
      if (field.required && !value) {
        errors[field.id] = 'Dado obrigatório'
        error = true
      }

      if (field.type === 'boolean') {
        state[field.id] = Boolean(value)
      }

      if (value && typeof value !== 'string' && field.type === 'editor') {
        state[field.id] = draftToHtml(convertToRaw(value.getCurrentContent()))
      }

      if (field.type === 'file') {
        isFormdata = true
      }
    }

    if (error) {
      this.setState({ errors })
      return
    }

    let func
    let url = `/api/${resource}`
    if ('_id' in state) {
      url += `/${state._id}`
      func = Axios.put
    } else {
      func = Axios.post
    }

    delete state.errors
    delete state.buttonDisabled

    let parse = difference(state, this.props.item)
    parse = isFormdata ? toFormData(parse) : parse

    this.setState({ buttonDisabled: true })
    func(url, parse, { headers: this.headers })
      .then(() => onSuccess())
      .catch(() => onError())
      .finally(() => this.setState({ buttonDisabled: false }))
  }

  render() {
    const { resource } = this.props
    return (
      <Container mx='40px'>
        <H2>
          {resource}
        </H2>
        {this.form}
        <Button variant='contained' disabled={this.state.buttonDisabled} onClick={this.onSubmit} color='primary' size='large'>
              Salvar
        </Button>
      </Container>
    )
  }
}
