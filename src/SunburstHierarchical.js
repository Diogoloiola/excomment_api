import hierarchicalJson from './hierarchicalJson.js';

class SunburstHierarchical extends hierarchicalJson {
    createHierarchicalJson(novo = false) {
        let sizelevels = this.levels.length;
        this.objs.forEach((d) => {

            let depthCursor = this.date.children
            if (depthCursor == undefined) {
                this.date = {
                    name: "home",
                    fill: ["#D2B48C"],
                    children: []
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
                                child.size += valor
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
                                        size: valor,
                                        fill: colors[key]
                                    });
                                } else {
                                    depthCursor.push({
                                        name: d[property],
                                        size: valor
                                    });
                                }
                            }
                        } else {

                            depthCursor.push({
                                name: d[property],
                                fill: ["#D2B48C"],
                                children: []
                            });
                        }

                        index = depthCursor.length - 1;
                    }
                } catch (error) {

                }


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
                } catch (error) {

                }

            })
        })
    }
}

export default SunburstHierarchical;