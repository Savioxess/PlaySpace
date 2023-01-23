const mongoose = require('mongoose')
const { Schema } = mongoose

const UserPreferenceSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    games: {
        type: [String],
        default: []
    }
})

const UserGames = mongoose.model('usergames', UserPreferenceSchema)

module.exports = UserGames