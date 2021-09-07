export default class Handler {
    constructor(Conection) {
        this.conection = Conection
    }
    getTechnicalDebt(idProject) {

    }

    getProjects(request, response) {
        const { id } = request.params.id;
        if (id !== undefined) {

        }
        response.json({
            'msg': 'Algo deu errado',
            'status': 400
        })
    }

    getTechnicalDebtCount(idProject) {

    }

    getScoreFromRepository(idProject) {

    }
}