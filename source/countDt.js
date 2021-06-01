function countDt(data) {
    let sizeDt = {}
    data.forEach(element => {
        if (sizeDt[element.tdtype] == undefined) {
            sizeDt[element.tdtype] = 1
        } else {
            sizeDt[element.tdtype]++
        }
    });
    return sizeDt
}

module.exports = countDt