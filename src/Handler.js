import { queryToGetAmountTD } from './utilsQuery.js';

export default class Handler {
    /**
     * Constructor class
     * @param {*} connection
     */
    constructor(connection) {
        this.connection = connection
    }
    /**
     * This function return projects in database
     * @param {*} request
     * @param {*} response
     * @return {Object}
     */
    async getProjects(request, response) {
        try {
            const data = await this.connection.any('select * from projects');
            response.json(data)
        } catch (error) {
            response.json(error);
        }
    }
    /**
     * This function returns the td present in the project
     * @param {*} request
     * @param {*} response
     * @return {Object}
     */
    getTechnicalDebtFromRepository(request, response) {
        const { id } = request.params;
        if (id !== undefined) {
            this.connection.any(queryToGetAmountTD(id)).then(data => {
                response.json(data)
            });
        } else {
            response.json({
                'msg': 'Algo deu errado',
                'status': 400
            })
        }
    }

    getTechnicalDebtCount(idProject) {
        //TODO: ainda por fazer
    }

    getScoreFromRepository(idProject) {
        //TODO: ainda por fazer
    }
}