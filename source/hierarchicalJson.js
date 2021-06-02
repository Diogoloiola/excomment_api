class hierarchicalJson {
    constructor() {
        this.date = {
            name: "Begin",
            children: []
        }
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
                        let level = this.levels[this.sizeLevel];
                        this.objs.push(this.objFactory(path))
                    } else {
                        this.objs[this.sizeObj][`${this.levels[index]}`] = path
                    }
                    this.sizeLevel++
                } else {
                    this.objs.push(this.objFactory(path))
                }
            })
            this.sizeObj++;
        }
    }

    createHierarchicalJson() {
        // console.log(this.objs)
        let sizelevels = this.levels.length;
        this.objs.forEach((d) => {

            let depthCursor = this.date.children

            let levels = this.levels.slice(0, d.length);

            levels.forEach(function(property, depth) {

                let index

                try {
                    depthCursor.forEach((child, i) => {
                        if (d[property] == child.name)
                            index = i;
                        if (child.name.indexOf('.java') != -1 && index != undefined) {
                            let valor = parseFloat(d[`level${depth+1}`])
                            child.value += valor
                        }
                    });

                    if (isNaN(index)) {
                        let newString = new String(d[property])


                        if (newString.indexOf('.java') != -1) {
                            let valor = parseFloat(d[`level${depth+1}`])
                            depthCursor.push({
                                name: d[property],
                                value: valor
                            });
                        } else {

                            depthCursor.push({
                                name: d[property],
                                children: []
                            });
                        }

                        index = depthCursor.length - 1;
                    }
                } catch (error) {
                    // console.log(error)
                }


                try {
                    depthCursor = depthCursor[index].children;
                    if (depth === sizelevels - 1) {
                        try {
                            depthCursor.push({
                                name: d.name
                            });
                        } catch (error) {
                            // console.log(error)
                        }

                    }
                } catch (error) {
                    // console.log(error)
                }

            })
        })
    }

    objFactory(path) {
        return {
            level1: path
        }
    }

}

module.exports = hierarchicalJson