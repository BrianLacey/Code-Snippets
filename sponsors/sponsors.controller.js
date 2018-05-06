/* Controller layer of the sponsors API. In keeping with single responsibility principle,
this middleware layer was designed only to receive requests and send responses. */

const responses = require("../models/responses");
const sponsorsServices = require("../services/sponsors.services");
const apiPrefix = "/api/sponsors";
module.exports = {
  readAll: readAll,
  readByEmail: readByEmail,
  readById: readById,
  update: update,
  del: del
};
function create(req, res) {
  sponsorsServices
    .create(req.model)
    .then(id => {
      const responseModel = new responses.ItemResponse();
      responseModel.id = id;
      responseModel.createDate = req.model.createDate;
      responseModel.updateDate = req.model.updateDate;
      res
        .status(201)
        .location(`${apiPrefix}/${id}`)
        .json(responseModel);
    })
    .catch(err => {
      res.status(500).send(new responses.ErrorResponse(err));
    });
}
function readAll(req, res) {
  sponsorsServices
    .readAll()
    .then(sponsors => {
      const responseModel = new responses.ItemsResponse();
      responseModel.items = sponsors;
      res.json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}
function readByEmail(req, res) {
  sponsorsServices
    .getByEmail(req.model.email)
    .then(data => {
      if (data) {
        res.status(409).send("This user already exists.");
      } else {
        create(req, res);
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
}
function readById(req, res) {
  sponsorsServices
    .getById(req.params.id)
    .then(sponsor => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = sponsor;
      res.json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}
function update(req, res) {
  req.model.updateDate = new Date()
  sponsorsServices
    .update(req.params.id, req.model)
    .then(sponsor => {
      res.status(200).send(req.model);
    })
    .catch(error => {
      res.status(500).send(error);
    });
}
function del(req, res) {
  sponsorsServices
    .del(req.params.id)
    .then(() => {
      const responseModel = new responses.SuccessResponse();
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(new responses.ErrorResponse(err));
    });
}
