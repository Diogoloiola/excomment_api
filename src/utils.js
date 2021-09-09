/**
 *
 * @param {*} project
 * @return {sizeDt}
 */
function dtCountInProject(project) {
  let sizeDt = {};
  project.forEach((comment) => {
    let key = comment.tdtype.toLowerCase();

    if (sizeDt[key] == undefined) {
      sizeDt[key] = 1;
    } else {
      sizeDt[key]++;
    }
  });
  return sizeDt;
}
/**
 *
 * @param {*} amountTD
 * @param {*} scoreProject
 * @param {*} typeJson
 * @param {*} hasColor
 * @returns {String}
 */
function createJsonHierarchical(amountTD, scoreProject, typeJson, hasColor) {
    //TODO: in progress
    const jsonHelper = getJsonHelperObj();
}
/**
 * This function returns obj corresponding to its type
 * @param {*} type
 * @returns {Object}
 */
function getJsonHelperObj(type = 1){
    //TODO: in progress
    type = parseInt(type);
    switch (type) {
        case 1:

        break;
        case 2:

        break;
    }
}
/**
 * This function clears the file path
 * @param {*} path
 * @returns {String}
 */
function generateCorrectPath(path) {
  let pathArray = path.split(/[\\"]/g);
  return pathArray.slice(8, pathArray.length).join("/");
}

export { dtCountInProject, createJsonHierarchical };
