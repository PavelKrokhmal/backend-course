import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

dotenv.config()

import router from './Router.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload())
app.use('/api', router)

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(PORT, () => console.log('Server started on port ' + PORT))

    } catch (e) {
        console.log(e)
    }
}

startApp()