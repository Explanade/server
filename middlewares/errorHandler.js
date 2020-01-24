module.exports = {
    errorHandler: function (err, req, res, next) {
        if (process.env.NODE_ENV === "development") {
            console.log(err);
        }
        if (err.message.name === "CastError") {
            let message = 'id not found'
            res.status(404).json({ message })
        } else {
            switch (err.name) {
                case 'ValidationError': {
                    let message = []
                    for (let key in err.errors) {
                        message.push(err.errors[key].message)
                    }
                    res.status(400).json({ message })
                }
                    break;
                case 'JsonWebTokenError': {
                    let message = []
                    if (err.message === 'invalid signature') {
                        message.push(`You're session is expired. Please login.`)
                    } else if (err.message === 'jwt must be provided') {
                        message.push('you have to login first')
                    } else if (err.message === 'jwt malformed') {
                        message.push('you have to login first')
                    } else {
                        message.push(err.message)
                    }
                    res.status(400).json({ message })
                    break;
                }
                case 'MongoError': {
                    let message = []
                    for (var key in err.keyPattern) {
                        message.push(key + ' already registered')
                    }
                    res.status(401).json({ message })
                }
                    break;
                default:
                    let status = err.status || 500
                    let message = err.message || 'Oops!! Sorry! Server is under attack!'
                    res.status(status).json({ message })
            }
        }
    }
}
