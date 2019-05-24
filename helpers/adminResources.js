import moment from 'moment'
import React from 'react'
import { X, Check } from 'react-feather'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'

export const fields = {
  lists: [
    {
      id: 'event',
      label: 'Festa',
      type: 'select',
      required: true,
      selectKey: 'party',
      resource: 'events?lists=true'
    },
    {
      id: 'birthday',
      type: 'date',
      parseDefaultValue: s => s && s.split('T')[0],
      label: 'Data aniversário'
    },
    {
      id: 'birthday_name',
      label: 'Aniversiarante',
      required: true
    },
    {
      id: 'cpf',
      label: 'CPF',
      required: true
    },
    {
      id: 'email',
      label: 'E-mail',
      required: true,
      type: 'email'
    },
    {
      id: 'names',
      label: 'Convidados',
      required: true,
      type: 'array'
    }
  ],
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
    },
    {
      id: 'birthday',
      label: 'Mostrar na tab Aniversários',
      type: 'boolean'
    },
    {
      id: 'college',
      label: 'Mostrar na tab Formaturas',
      type: 'boolean'
    },
    {
      id: 'home',
      label: 'Mostrar na tab A Casa',
      type: 'boolean'
    }
  ],
  config: [
    {
      id: 'home_text',
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
      label: 'Texto da A Casa'
    },
    {
      id: 'college_text',
      type: 'editor',
      parseDefaultValue: s => {
        const blocksFromHTML = convertFromHTML(s || '<div></div>')
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        return EditorState.createWithContent(state)
      },
      required: true,
      label: 'Texto de Formatura'
    },
    {
      id: 'birthday_text',
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
      label: 'Texto de Aniversário'
    },
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
      label: 'Twitter User'
    },
    {
      id: 'number_events',
      label: 'Número de próximos eventos',
      type: 'number'
    },
    {
      id: 'instagram_photos',
      label: 'Número de fotos na Tab Fotos',
      type: 'number'
    },
    {
      id: 'instagram_token',
      label: 'Token para acessar fotos do instagram'
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
      selectKey: 'party',
      resource: 'events?guests=true'
    },
    {
      id: 'email',
      label: 'E-mail',
      type: 'email'
    },
    {
      id: 'name',
      label: 'Nome'
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
  events: [
    {
      link: s => `/api/events/${s._id}/list`,
      text: 'Lista para impressão',
      target: '_blank'
    },
    {
      link: s => `/admin/dashboard/lists?filterResource=event&filterValue=${s._id}&subtitle=${s.party}`,
      text: 'Listas de aniversários'
    },
    {
      link: s => `/admin/dashboard/guests?filterResource=event&filterValue=${s._id}&subtitle=${s.party}`,
      text: 'Nomes na lista'
    }
  ]
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
    },
    {
      key: 'home',
      title: 'A Casa',
      text: s => s.home ? <Check /> : <X />
    },
    {
      key: 'birthday',
      title: 'Aniversários',
      text: s => s.birthday ? <Check /> : <X />
    },
    {
      key: 'college',
      title: 'Formatura',
      text: s => s.college ? <Check /> : <X />
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
      key: 'cpf',
      title: 'CPF'
    },
    {
      key: 'birthday',
      text: s => moment(s.date).format('DD/MM/YYYY'),
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
      key: 'name',
      title: 'Nome'
    }
  ],
  events: [
    {
      key: 'party',
      title: 'Festa'
    },
    {
      key: 'guest_count',
      title: 'Nomes'
    },
    {
      key: 'birthday_count',
      title: 'Listas'
    },
    {
      key: 'edition',
      title: 'Edição'
    },
    {
      key: 'cover',
      text: s => s.cover && <img style={{ maxWidth: '100px' }} src={`/${s.cover.path}`} />,
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
