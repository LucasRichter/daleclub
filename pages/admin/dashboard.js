import React, { Component } from 'react'
import PageHead from '../../components/PageHead'
import { Flex, Box } from '@rebass/grid'
import Router from 'next/router'
import { withSnackbar } from 'notistack'
import Axios from 'axios'
import PropTypes from 'prop-types'
import Table from '../../components/Table'
import * as resources from '../../helpers/adminResources'
import AdminMenu from '../../components/AdminMenu'
import { Button } from '@material-ui/core'
import { H2, H1 } from '../../components/Title'
import ResourceMenu from '../../components/ResourceMenu'
import AdminForm from '../../components/AdminForm'

class IndexPage extends Component {
  static propTypes = {
    items: PropTypes.array,
    action: PropTypes.string,
    item: PropTypes.object,
    enqueueSnackbar: PropTypes.func.isRequired,
    resource: PropTypes.string
  }

  static defaultProps = {
    items: [],
    item: {}
  }

  static async getInitialProps ({ query: { id, resource, action } }) {
    let items, item
    let params = resources.params[resource] || {}
    if (resource) {
      if (!action) {
        const res = await Axios.get(`/api/${resource}`, { params })
        items = res.data
      }

      if (id) {
        const res = await Axios.get(`/api/${resource}/${id}`, { params })
        item = res.data
      }
    }

    return { items, item, resource, action }
  }

  get content() {
    const { resource, action, items, item, enqueueSnackbar } = this.props

    if (!resource) {
      return <H1>Dashboard</H1>
    }

    switch (action) {
      case 'edit':
      case 'create':
        return (
          <AdminForm
            onSuccess={() => {
              Router.push('/admin/dashboard')
              enqueueSnackbar('Conteúdo salvo com sucesso!', { variant: 'success' })
            }}
            onError={() => {
              enqueueSnackbar('Algo deu errado!', { variant: 'error' })
            }}
            resource={resource}
            item={item}
          />
        )

      default:
        return (
          <Box>
            <Flex
              justifyContent='space-between'
            >
              <H2>
                {resource}
              </H2>

              <Button
                href={`/admin/dashboard/${resource}/create`}
                variant='contained'
                color='default'
              >
                Criar
              </Button>
            </Flex>
            <Table
              columns={[
                ...resources.columns[resource],
                {
                  title: 'Ações',
                  text: s => <ResourceMenu resource={resource} extraMenus={resources.extraMenus[resource]} item={s} />
                }
              ]}
              items={items}
            />
          </Box>
        )
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('DALECLUB_TOKEN')

    if (!token) {
      Router.push('/admin')
    }
  }

  onChange = e => {
    e.preventDefault()
    const { id, value } = e.target

    this.setState({ [id]: value })
  }

  render () {
    return (
      <main>
        <PageHead
          title='Daleclub | Dashboard'
          description='Login'
        />

        <Flex
          css={{ backgroundColor: 'white', textAlign: 'center' }}
          m={['20px 0', '0']}
          p={['20px']}
        >
          <AdminMenu />
          {this.content}
        </Flex>

      </main>
    )
  }
}

export default withSnackbar(IndexPage)
