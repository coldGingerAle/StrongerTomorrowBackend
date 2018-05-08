const requirement = require('../models').requirement;
const scholarship = require('../models').scholarship;
const scholarship_requirements = require('../models').scholarship_requirements;

module.exports = {

  create(req, res) {
    if (req.body.name == '' || req.body.name == undefined || req.body.description == '' || req.body.description == undefined) {
      missing = {};
      if (req.body.name == '' || req.body.name == undefined) {
        missing.name = 'name is required'
      }
      if (req.body.description == '' || req.body.description == undefined) {
        missing.description = 'description is required'
      }
      return res.status(422).json({
        status: 'fail',
        data: missing
      })
    }
    return requirement
      .create({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
      })
      .then(requirement => res.status(201).json({
        status: 'success',
        data: {
          requirement: requirement
        }
      }))
      .catch(error => res.status(400).json({
        status: 'error',
        message: error.message
      }));
  },

  list(req, res) {
    return requirement
      .findAll({
        include: [{
          model: scholarship
        }]
      })
      .then(requirements => res.status(200).json({
        status: 'success',
        data: {
          requirements: requirements
        }
      }))
      .catch(error => res.status(400).json({
        status: 'error',
        message: error.message
      }));
  },

  update(req, res) {
    return requirement
      .findById(req.params.req_id, {
        include: [{
          model: scholarship
        }],
      })
      .then(requirement => {
        if (!requirement) {
          return res.status(404).json({
            status: 'fail',
            data: {
              requirement: 'requirement not found'
            }
          });
        }
        return requirement
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => {
            res.status(200).send({
              status: 'success',
              data: {
                requirement: requirement
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
      .catch((error) => {
        res.status(400).json({
          status: 'error',
          message: error.message
        })
      })
  },

  destroy(req, res) {
    return requirement
      .findById(req.params.req_id)
      .then(requirement => {
        if (!requirement) {
          return res.status(404).json({
            status: 'fail',
            data: {
              requirement: 'requirement does not exist'
            }
          });
        }
        return requirement
          .destroy()
          .then(() => {
            return scholarship_requirements.destroy({
              where: {
                req_id: req.params.req_id
              }
            })
          })
          .then(() => res.status(200).json({
            status: 'success',
            data: null
          }))
          .catch(error => res.status(400).json({
            status: 'error',
            message: error.message
          }));
      })
      .catch(error => res.status(400).json({
        status: 'error',
        message: error.message
      }));
  },

  getOne(req, res) {
    return requirement
      .findById(req.params.req_id, {
        include: [{
          model: scholarship
        }],
      })
      .then(requirement => {
        if (!requirement) {
          return res.status(404).json({
            status: 'fail',
            data: {
              requirement: 'requirement not found'
            }
          })
        }
        res.status(200).json({
          status: 'success',
          data: {
            requirement: requirement
          }
        })
      })
      .catch(error => res.status(400).json({
        status: 'error',
        message: error.message
      }));
  },
};
