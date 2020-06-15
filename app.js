const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('mongoose')

const app = express()

// middleware,that parses json
app.use(express.json({extended: true})) 

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'produciton') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build', )))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true    
        })
        app.listen(PORT, () => console.log(`App has been started on ${PORT}`))

    } catch (e) {
        console.log('Server error ', e.message)
        process.exit(1)
    }
}

start()
