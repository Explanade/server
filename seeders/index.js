const User = require('../models/user');
const TokyoTrip = require('./tokyo');
const NewYorkTrip = require('./newYork');
const ParisTrip = require('./paris');

const explanadeData = {
    name: 'Explanade Team',
    email: 'explanade@mail.com',
    password: 'explanade'
}

const angelaData = {
    name: 'Angela Vanessa',
    email: 'angela@mail.com',
    password: 'asdasd'
}

const afifahData = {
    name: 'Afifah Rahma Kustanto',
    email: 'afifah@mail.com',
    password: 'asdasd'
}

const dzakyData = {
    name: 'Renault Dzaky',
    email: 'dzaky@mail.com',
    password: 'asdasd'
}

const alfredData = {
    name: 'Dwitama Alfred',
    email: 'alfred@mail.com',
    password: 'asdasd'
}

const andreasData = {
    name: 'Andreas Holiwono',
    email: 'andreas@mail.com',
    password: 'asdasd'
}

module.exports = async() => {
    const explanadeTeam = await User.create(explanadeData);
    const angela = await User.create(angelaData);
    const afifah = await User.create(afifahData);
    const dzaky = await User.create(dzakyData);
    const alfred = await User.create(alfredData);
    const andreas = await User.create(andreasData);

    const users = { explanadeTeam, angela, afifah, dzaky, alfred, andreas }

    TokyoTrip(users);
    NewYorkTrip(users);
    ParisTrip(users);
}