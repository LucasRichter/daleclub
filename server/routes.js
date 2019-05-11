const routes = require('next-routes')
const routesImplementation = routes()

// routesImplementation
//   .add([identifier], pattern = /identifier, page = identifier)
//   .add('/blog/:slug', 'blogShow')
//   .add('showBlogPostRoute', '/blog/:slug', 'blogShow')

routesImplementation.add('/admin', 'admin')
routesImplementation.add('/:id', 'index')
routesImplementation.add('/lista', 'lista')
routesImplementation.add('/lista/:event', 'lista')

module.exports = routesImplementation

// Usage inside Page.getInitialProps (req = { pathname, asPath, query } = { pathname: '/', asPath: '/about', query: { slug: 'about' } })
