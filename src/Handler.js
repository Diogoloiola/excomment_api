import { queryToGetAmountTD } from './utilsQuery.js';

export default class Handler {
    constructor(Conection) {
        this.conection = Conection
    }
    getProjects(request, response) {
        //TODO: ainda por fazer
    }
    getTechnicalDebtFromRepository(request, response) {
        const { id } = request.params;
        if (id !== undefined) {
            this.conection.any(queryToGetAmountTD(id)).then(data => {
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