const toUpdate = (fields, data) => {
    let dataChanged = {}
    console.log(data);

    for (let key in data) {
        fields.forEach(el => {
            if (el === key) {
                dataChanged[key] = data[key]
            }
        })
    }
    return dataChanged
}

module.exports = toUpdate