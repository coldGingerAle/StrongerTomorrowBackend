const Record = require('../models').record;

module.exports = {
  create(req, res) {
    if (req.body.rs_id == '' || req.body.rs_id == undefined || req.body.req_id == '' || req.body.req_id == undefined || req.body.value == '' || req.body.value == undefined) {
      missing = {};
      if (req.body.rs_id == '' || req.body.rs_id == undefined) {
        missing.rs_id = 'rs_id is required'
      }
      if (req.body.req_id == '' || req.body.req_id == undefined) {
        missing.req_id = 'req_id is required'
      }
      if (req.body.value == '' || req.body.value == undefined) {
        missing.value = 'value is required'
      }
      return res.status(422).json({
        status: 'fail',
        data: missing
      })
    }
    return Record
      .findAll({
        where: {rs_id: req.body.rs_id, req_id: req.body.req_id}
      })
      .then(records => {
        return records[0]
      })
      .then(record => {
        if (!record) {
          Record.create({
            rs_id: req.body.rs_id,
            req_id: req.body.req_id,
            value: req.body.value
          })
          .then(record => res.status(201).send({
            status: 'success',
            data: {
              record: record
            }
          }))
          .catch(error => {
            res.status(400).json({
              status: 'error',
              message: error.message
            })
          })
        }
        return Record
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => {
            res.status(200).json({
              status: 'success',
              data: {
                record: record
              }
            })
          })
          .catch((error) => {
            res.status(400).json({
              status: 'error',
              message: error.message
            })
          })
      })
  },

  list(req, res) {
    return Record
      .findAll()
      .then(records => res.status(200).send(records))
      .catch(error => res.status(400).send(error.message));
  },

  destroy(req, res) {
    return Record
      .findById(req.body.id)
      .then(record => {
        if (!record) {
          return res.status(400).send({
            message: 'record Not Found',
          });
        }
        return record
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error.message));
      })
      .catch(error => res.status(400).send(error.message));
  },

  getOne(req, res) {
    return record
      .findById(req.body.id)
      .then(record => res.status(200).send(record))
      .catch(error => res.status(400).send(error));
  },
}
