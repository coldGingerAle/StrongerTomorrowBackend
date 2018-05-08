const scholarship = require('../models').scholarship;
const requirement = require('../models').requirement;
const scholarship_requirements = require('../models').scholarship_requirements;

module.exports = {

  create(req, res) {
    if (req.body.name == undefined || req.body.name == '') {
      res.status(422).json({
        status: "fail",
        data: {
          name: "A name is required."
        }
      })
    }
    return scholarship
      .create({
        name: req.body.name
      })
      .then(scholarship => res.status(201).json({
        status: "success",
        data: {
          scholarship: scholarship
        }
      }))
      .catch(error => res.json({
        status: "error",
        message: error.message
      }));

  },

  list(req, res) {
    return scholarship
      .findAll({
        include: [{
          model: requirement
        }]
      })
      .then(scholarships => res.json({
        status: "success",
        data: {
          scholarships: scholarships
        }
      }))
      .catch(error => res.json({
        status: "error",
        message: error.message
      }));
  },

  getOne(req, res) {
    return scholarship
      .findById(req.params.sc_id, {
        include: [{
          model: requirement
        }],
      })
      .then(scholarship => {
        if (!scholarship) {
          return res.status(404).json({
            status: 'fail',
            data: {
              scholarship: 'scholarship not found'
            }
          })
        }
        res.status(200).json({
          status: 'success',
          data: {
            scholarship: scholarship
          }
        })
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return scholarship
      .findById(req.params.sc_id, {
        include: [{
          model: requirement
        }],
      })
      .then(scholarship => {
        if (!scholarship) {
          return res.status(404).json({
            status: "fail",
            data: {
              scholarship: "scholarship does not exist"
            }
          })
        }
        return scholarship
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => {
            res.status(200).json({
              status: "success",
              data: {
                scholarship: scholarship
              }
            })
          })
          .catch((error) => {
            res.status(400).json({
              status: "error",
              data: {
                message: error.message
              }
            })
          })
      })
      .catch((error) => {
        res.status(400).json({
          status: "error",
          data: {
            message: error.message
          }
        })
      })
  },

  destroy(req, res) {
    return scholarship
      .findById(req.params.sc_id)
      .then(scholarship => {
        if (!scholarship) {
          return res.status(404).json({
            status: "fail",
            data: {
              scholarship: "scholarship not found"
            }
          });
        }
        return scholarship
          .destroy()
          .then(() => {
            return scholarship_requirements.destroy({
              where: {
                sc_id: req.params.sc_id
              }
            })
          })
          .then(() => res.status(200).json({
            status: 'success',
            data: null
          }))
          .catch(error => res.status(400).json({
            status: "error",
            message: error.message
          }));
      })
      .catch(error => res.status(400).json({
        status: 'error',
        message: error.message
      }));
  },

  addRequirements(req, res) {
    if (req.body.value == '' || req.body.value == undefined) {
      return res.status(422).json({
        status: 'fail',
        data: {
          value: 'A value is required'
        }
      })
    }
    return scholarship_requirements
      .create({
        value: req.body.value,
        operation: req.body.operation,
        sc_id: req.params.sc_id,
        req_id: req.params.req_id
      })
      .then(scholarship => res.status(200).json({
        status: 'success',
        data: {
          scholarship_requirement: {
            value: req.body.value,
            operation: req.body.operation,
            sc_id: req.params.sc_id,
            req_id: req.params.req_id
          }
        }
      }))
      .catch(error => res.status(400).json({
        status: 'error',
        message: error.message
      }));
  },

  removeAssociations(req, res) {
    return scholarship_requirements.destroy({
      where: {
        sc_id: req.params.sc_id,
        req_id: req.params.req_id
      }
    })
    .then(scholarship => res.status(200).json({
      status: 'success',
      data: null
    }))
    .catch(error => res.status(400).json({
      status: 'error',
      message: error.message
    }));
  },

  setRequirements(req, res) {
    return scholarship_requirements
      .findAll({
        where: {
          sc_id: req.params.sc_id,
          req_id: req.params.req_id
        }
      })
      .then(srArray => srArray[0])
      .then(sr => {
        if (!sr) {
          return res.status(404).json({
            status: 'fail',
            data: {
              scholarship_requirement: 'scholarship requirement not found'
            }
          });
        }
        return sr
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => {
            res.status(200).json({
              status: 'success',
              data: {
                scholarship_requirement: sr
              }
            })
          .catch((error) => {
            res.status(400).json({
              status: 'error',
              message: error.message
            })
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

};
