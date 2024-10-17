const jsonServer = require('json-server')

const server = jsonServer.create()

const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use('/http://localhost:3000/sneakers', router)
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})