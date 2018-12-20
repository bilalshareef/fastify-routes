'use strict'

const fp = require('fastify-plugin')

function fastifyRoutes (fastify, options, next) {
  fastify.decorate('routes', new Map())

  fastify.addHook('onRoute', (routeOptions) => {
    const { method, schema, url, logLevel, prefix, bodyLimit } = routeOptions
    const key = method.toLowerCase()
    const route = { method, schema, url, logLevel, prefix, bodyLimit }

    if (fastify.routes.has(url)) {
      let current = fastify.routes.get(url)
      fastify.routes.set(url, Object.assign(current, { [key]: route }))
    } else {
      fastify.routes.set(url, { [key]: route })
    }
  })

  next()
}

module.exports = fp(fastifyRoutes, {
  fastify: '>=1.1.0',
  name: 'fastify-routes'
})
