const User = require('../models/user');
const TokyoTrip = require('./tokyo');
const NewYorkTrip = require('./newYork');
const ParisTrip = require('./paris');

const explanadeData = {
    name: 'Explanade Team',
    email: 'explanade@mail.com',
    password: 'explanade'
}


module.exports = async() => {
    const explanadeTeam = await User.create(explanadeData);

    TokyoTrip(explanadeTeam);
    NewYorkTrip(explanadeTeam);
    ParisTrip(explanadeTeam);
}