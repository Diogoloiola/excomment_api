function countDt(data) {
    let sizeDt = {}
    data.forEach(element => {
        if (sizeDt[element.tdtype.toLowerCase()] == undefined) {
            sizeDt[element.tdtype.toLowerCase()] = 1
        } else {
            sizeDt[element.tdtype.toLowerCase()]++
        }
    });
    return sizeDt
}

module.exports = countDt