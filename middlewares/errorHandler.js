module.exports = {
    errorHandler: function (err, req, res, next) {
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
                }
                res.status(401).json({ message })
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
                let message = err.message || 'Internal Server Error'
                res.status(status).json({ message })
        }
    }
}
