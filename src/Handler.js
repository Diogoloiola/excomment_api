import { queryToGetAmountTD, queryToGetScores } from "./utilsQuery.js";
import { dtCountInProject } from "./utils.js";
export default class Handler {
  /**
   * Constructor class
   * @param {*} connection
   */
  constructor(connection) {
    this.connection = connection;
  }
  /**
   * This function return projects in database
   * @param {*} request
   * @param {*} response
   * @return {Object}
   */
  async getProjects(request, response) {
    try {
      const data = await this.connection.any("select * from projects");
      response.json(data);
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
      this.connection.any(queryToGetAmountTD(id)).then((data) => {
        response.json(data);
      });
    } else {
      response.json({
        msg: "Algo deu errado",
        status: 400,
      });
    }
  }

  /**
   * This function returns the td amount present in the project
   * @param {*} request
   * @param {*} response
   * @return {Object}
   */

  async getTechnicalDebtCount(request, response) {
    const { id } = request.params;
    console.log(id);
    if (id !== undefined) {
      try {
        const data = await this.connection.any(queryToGetAmountTD(id));
        const result = dtCountInProject(data);
        response.json(result);
      } catch (error) {
        response.json(error);
      }
    } else {
      response.json({
        msg: "Algo deu errado",
        status: 400,
      });
    }
  }
  /**
   * This function returns the score of a project
   * @param {*} request
   * @param {*} response
   * @return {Object}
   */
  async getScoreFromRepository(request, response) {
    const { id } = request.params;
    if (id !== undefined) {
      try {
        const data = await this.connection.any(queryToGetScores(id));
        response.json(data);
      } catch (error) {
        response.json(error);
      }
    } else {
      response.json({
        msg: "Algo deu errado",
        status: 400,
      });
    }
  }

  async getJsonHierarchicalOfProject(request, response) {
    //TODO: in progress
    const { id } = request.params;
    if (id !== undefined) {
      const { flag } = request.query;
      const data = await this.connection.multi(
        queryToGetAmountTD(id) + ";" + queryToGetScores(id)
      );
      const [amountTD, scoreProject] = data;
    }
  }
}
