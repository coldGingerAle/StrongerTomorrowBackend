const scholarship_requirements = require('../models').scholarship_requirements;

module.exports = {
  destroy(req, res) {
    return scholarship
      .findById(req.params.sc_id)
      .then(scholarship => {
        if (!scholarship) {
          return res.status(400).send({
            message: 'Scholarship Not Found',
          });
        }
        return scholarship
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
}
