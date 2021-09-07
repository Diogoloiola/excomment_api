/**
 * 
 * @param {*} project 
 * @return {sizeDt}
 */

function dtCountInProject(project) {
    let sizeDt = {};
    project.forEach(comment => {
        let key = comment.tdtype.toLowerCase();

        if (sizeDt[key] === undefined) {
            sizeDt[key] = 1
        } else {
            sizeDt[key]++
        }
    });
}

export { dtCountInProject };