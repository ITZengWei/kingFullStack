const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())


app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/web', express.static(__dirname + '/web'))

app.set('secret', 'bill')


require('./plugins/db')(app)
require('./routes/web')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
	console.log('http://localhost:3000')
})