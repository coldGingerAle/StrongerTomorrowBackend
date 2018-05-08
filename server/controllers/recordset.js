const recordset = require('../models').recordset;
const record = require('../models').record;
const scholarship = require('../models').scholarship;
const requirement = require('../models').requirement;

module.exports = {

  create(req, res) {
    return recordset
      .create({
        user_id: null
      })
      .then(recordset => res.status(201).json({
        status: 'success',
        data: {
          recordset: recordset
        }
      }))
      .catch(error => res.status(400).json({
        status: 'error',
        message: error.message
      }));
  },

  list(req, res) {
    return recordset
      .findAll({
        include: [{
          model: record
        }]
      })
      .then(recordsets => {
        res.status(200).json({
          status: 'success',
          data: {
            recordsets: recordsets
          }
        })
      })
      .catch(error => res.status(400).send({
        status: 'error',
        message: error.message
      }));
  },

  getScholarships(req, res) {

    return recordset.findById(req.params.id, {
      include: [{
        model: record
      }]
    }).then(recordset => {

      return scholarship
        .findAll({
          include: [{
            model: requirement
          }]
        })
        .then(scholarships =>

          scholarships = scholarships.filter(function(scholarship) {
            var isEligible = true;
            scholarship.requirements.forEach(requirement => {

              var eligible = true;
              var requirementFound = false;

              recordset.records.forEach(record => {
                if (requirement.id != record.req_id) return;
                requirementFound = true;
                if (requirement.scholarship_requirements.operation == -1) {
                  eligible = (Number(record.value) < requirement.scholarship_requirements.value)
                } else if (requirement.scholarship_requirements.operation == 0) {
                  eligible = (Number(record.value) == requirement.scholarship_requirements.value)
                } else if (requirement.scholarship_requirements.operation == 1) {
                  eligible = (Number(record.value) > requirement.scholarship_requirements.value)
                } else {
                  eligible = true;
                }
              })
              if (!(eligible && requirementFound)) isEligible = false;
            })
            return isEligible;
          })

        ).then(scholarships => {
          res.status(200).send({
            status: 'success',
            data: {
              eligible_scholarships: scholarships
            }
          })
        }).catch(error => res.status(400).json({
          status: 'error',
          message: error.message
        }))
    }).catch(error => res.status(400).json({
      status: 'error',
      message: error.message
    }))

  },


  getOne(req, res) {
    return recordset
      .findById(req.params.id, {
        include: [{
          model: record
        }],
      })
      .then(recordset => {
        if (!recordset) {
          return res.status(404).json({
            status: 'fail',
            data: {
              recordset: 'recordset not found'
            }
          })
        }
        res.status(200).send({
          status: 'success',
          data: {
            recordset: recordset
          }
        })
      })
      .catch(error => res.status(400).json({
        status: 'error',
        message: error.message
      }));
  },

  update(req, res) {
    return recordset
      .findById(req.params.sc_id, {
        include: [{
          model: record
        }],
      })
      .then(recordset => {
        if (!recordset) {
          return res.status(404).send({
            message: 'recordset Not Found',
          });
        }
        return recordset
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => {
            res.status(200).send(recordset) // Send back the updated recordset.
          })
          .catch((error) => {
            res.status(400).send(error)
          })
      })
      .catch((error) => {
        res.status(400).send(error)
      })
  },

  destroy(req, res) {
    return recordset
      .findById(req.params.sc_id)
      .then(recordset => {
        if (!recordset) {
          return res.status(400).send({
            message: 'recordset Not Found',
          });
        }
        return recordset
          .destroy()
          .then(() => {
            return recordset_records.destroy({
              where: {
                sc_id: req.params.sc_id
              }
            })
          })
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
