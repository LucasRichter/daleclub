import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'

export default class index extends Component {
  static propTypes = {
    prop: PropTypes
  }

  state = {
    editorState: EditorState.createEmpty()
  }

  render() {
    const { editorState } = this.state
    return (
      <Editor
        editorState={editorState}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName='editorClassName'
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
