import app from './app'
import config from './config/index'

const {
    PORT
} = config
app.listen(PORT, () => {
    console.log(`THIS APP IS RUNNING AT PORT ${PORT} `)
})