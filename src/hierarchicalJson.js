const colors = require('../utils/colors')

class hierarchicalJson {
    constructor() {
        this.date = {}
        this.levels = this.generateLevels();
        this.paths = []
        this.objs = []
        this.sizeObj = 0
        this.sizeLevel = 1
    }

    generateLevels() {
        let levels = []
        for (let i = 0; i < 16; i++) {
            levels.push(`level${i}`)
        }
        return levels;
    }

    pushPath(str) {
        this.paths.push(str);
    }

    creteDataObj() {
        let size = this.paths.length;

        for (let i = 0; i < size; i++) {
            let arrayPaths = this.paths[i].split('/');
            arrayPaths.forEach((path, index) => {
                if (this.objs.length) {

                    if (this.objs[this.sizeObj] === undefined) {
                        this.objs.push(this.objFactory(path, this.levels[index]))
                    } else {
                        this.objs[this.sizeObj][`${this.levels[index]}`] = path
                    }
                    this.sizeLevel++
                } else {
                    this.objs.push(this.objFactory(path, this.levels[index]))
                }
            })
            this.sizeObj++;
        }
    }

    createHierarchicalJson(novo = false, flag = false) {
        let sizelevels = this.levels.length;
        this.objs.forEach((d) => {

            let depthCursor = this.date.children
            if (depthCursor == undefined) {
                if (flag) {
                    this.date = {
                        name: "home",
                        children: [],
                        fill: '#D2B48C'
                    }
                } else {
                    this.date = {
                        name: "home",
                        children: []
                    }
                }
                depthCursor = this.date.children
            }
            let levels = this.levels.slice(0, d.length);

            levels.forEach(function(property, depth) {

                let index
                try {
                    depthCursor.forEach((child, i) => {
                        if (d[property] == child.name)
                            index = i;
                        if (child.name.indexOf('.java') != -1 && index != undefined) {
                            let valor = parseInt(d[`level${depth+1}`])
                            if (valor != 0 || valor != undefined) {
                                // child.value += valor
                            }
                        }
                    });

                    if (isNaN(index)) {
                        let newString = new String(d[property])


                        if (newString.indexOf('.java') != -1) {
                            let valor = parseInt(d[`level${depth+1}`])
                            let key = d[`level${depth+2}`]
                            if (valor >= 0 && valor != undefined) {
                                if (novo) {
                                    depthCursor.push({
                                        name: d[property],
                                        value: valor,
                                        fill: colors[key]
                                    });
                                } else {
                                    depthCursor.push({
                                        name: d[property],
                                        value: valor
                                    });
                                }
                            }
                        } else {
                            if (flag) {
                                depthCursor.push({
                                    name: d[property],
                                    children: [],
                                    fill: '#D2B48C'
                                });
                            } else {
                                depthCursor.push({
                                    name: d[property],
                                    children: []
                                });
                            }
                        }

                        index = depthCursor.length - 1;
                    }
                } catch (error) {}


                try {
                    depthCursor = depthCursor[index].children;
                    if (depth === sizelevels - 1) {
                        try {
                            depthCursor.push({
                                name: d.name
                            });
                        } catch (error) {

                        }

                    }
                } catch (error) {}

            })
        })
    }

    objFactory(path, key) {
        let obj = {}
        obj[key] = path
        return obj
    }

}

export default hierarchicalJson;