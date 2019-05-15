import moment from 'moment'
import React from 'react'
import { X, Check } from 'react-feather'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'

export const fields = {
  images: [
    {
      id: 'file',
      type: 'file',
      required: true,
      label: 'File'
    },
    {
      id: 'carousel',
      label: 'Mostrar no carossel',
      type: 'boolean'
    }
  ],
  config: [
    {
      id: 'facebook',
      label: 'Facebook Link'
    },
    {
      id: 'instagram',
      label: 'Instragram Link'
    },
    {
      id: 'twitter',
      label: 'Twitter Link'
    },
    {
      id: 'twitter_user',
      label: 'Twitter Mention'
    },
    {
      id: 'number_events',
      label: 'Número de próximos eventos',
      type: 'number'
    },
    {
      id: 'contact_email',
      label: 'Contato'
    }
  ],
  guests: [
    {
      id: 'event',
      label: 'Festa',
      type: 'select',
      resource: 'events'
    },
    {
      id: 'email',
      label: 'E-mail',
      type: 'email'
    },
    {
      id: 'names',
      label: 'Nome',
      type: 'array'
    }
  ],
  users: [
    {
      id: 'email',
      autocompleteOff: true,
      label: 'Username'
    },
    {
      id: 'password',
      autocompleteOff: true,
      label: 'Senha',
      type: 'password'
    }
  ],
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

export const params = {
  guests: {
    populate: 'event'
  },
  lists: {
    populate: 'event'
  },
  users: {
    select: 'email'
  }
}

export const extraMenus = {
  events: [{
    link: s => `/api/events/${s._id}/list`,
    text: 'Lista para impressão',
    target: '_blank'
  }]
}

export const columns = {
  images: [
    {
      key: 'file',
      text: s => s.file && <img style={{ maxWidth: '177px' }} src={`/${s.file.path}`} />,
      title: 'Image'
    },
    {
      key: 'carousel',
      title: 'Carousel',
      text: s => s.carousel ? <Check /> : <X />
    }
  ],
  users: [
    {
      key: 'email',
      title: 'Username'
    }
  ],
  lists: [
    {
      key: 'event.name',
      title: 'Festa',
      text: s => s.event && s.event.party
    },
    {
      key: 'email',
      title: 'E-mail'
    },
    {
      key: 'birthday_name',
      title: 'Aniversiarante'
    },
    {
      key: 'birthday',
      text: s => moment(s.date).format('DD/MM/YYYY HH:mm'),
      title: 'Data aniversário'
    },
    {
      key: 'names',
      title: 'Covidados',
      text: s => s.names && s.names.join(', ')
    }
  ],
  guests: [
    {
      key: 'event.name',
      title: 'Festa',
      text: s => s.event && s.event.party
    },
    {
      key: 'email',
      title: 'E-mail'
    },
    {
      key: 'names',
      title: 'Nomes',
      text: s => s.names && s.names.join(', ')
    }
  ],
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
