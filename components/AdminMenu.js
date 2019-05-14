import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 220,
    backgroundColor: theme.palette.background.paper
  }
})

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />
}

const links = {
  events: 'Eventos'
}

function AdminList(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <List component='nav'>
        {Object.entries(links).map(([ key, value ]) => (
          <ListItemLink key={key} href={`/admin/dashboard/${key}`}>
            <ListItemText primary={value} />
          </ListItemLink>
        ))}
      </List>
    </div>
  )
}

AdminList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AdminList)
