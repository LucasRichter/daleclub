import moment from 'moment'
import React from 'react'
import { X, Check } from 'react-feather'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'

export const fields = {
  events: [
    {
      id: 'party',
      label: 'Festa',
      required: true
    },
    {
      id: 'edition',
      label: 'Edição'
    },
    {
      id: 'permalink',
      label: 'Permalink',
      required: true
    },
    {
      id: 'cover',
      type: 'file',
      required: true,
      label: 'Cover'
    },
    {
      id: 'date',
      type: 'datetime-local',
      parseDefaultValue: s => s && s.substring(0, 16),
      label: 'Data'
    },
    {
      id: 'description',
      type: 'editor',
      parseDefaultValue: s => {
        const blocksFromHTML = convertFromHTML(s)
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        return EditorState.createWithContent(state)
      },
      required: true,
      label: 'Descrição'
    },
    {
      id: 'show',
      label: 'Show',
      type: 'boolean'
    },
    {
      id: 'lists',
      label: 'Lista de aniversário',
      type: 'boolean'
    },
    {
      id: 'guests',
      label: 'Nome na lista',
      type: 'boolean'
    }
  ]
}

export const columns = {
  events: [
    {
      key: 'party',
      title: 'Festa'
    },
    {
      key: 'edition',
      title: 'Edição'
    },
    {
      key: 'permalink',
      title: 'Permalink'
    },
    {
      key: 'cover',
      text: s => s.cover && <img style={{ maxWidth: '177px' }} src={`/${s.cover.path}`} />,
      title: 'Cover'
    },
    {
      key: 'date',
      text: s => moment(s.date).format('DD/MM/YYYY HH:mm'),
      title: 'Data'
    },
    {
      key: 'show',
      title: 'Show',
      text: s => s.show ? <Check /> : <X />
    }
  ]
}
