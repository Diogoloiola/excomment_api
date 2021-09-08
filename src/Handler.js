import { queryToGetAmountTD } from './utilsQuery.js';

export default class Handler {
    constructor(connection) {
        this.connection = connection
    }
    async getProjects(request, response) {
        try {
            const data = await this.connection.any('select * from projects');
            response.json(data)
        } catch (error) {
            response.json(error);
        }
    }
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