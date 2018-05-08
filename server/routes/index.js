const scholarshipController = require('../controllers').scholarship;
const requirementController = require('../controllers').requirement;
const recordController = require('../controllers').record;
const recordsetController = require('../controllers').recordset;

module.exports = (app) => {
  app.get('/api/v1', (req, res) => res.status(200).send({
    message: 'Welcome to the Excelsior Scholarship api/v1!',
  }));

  app.get('/api/v1/scholarships', scholarshipController.list); //JSend compliant
  app.post('/api/v1/scholarships', scholarshipController.create); //JSend compliant
  app.put('/api/v1/scholarships/:sc_id', scholarshipController.update); //JSend compliant
  app.delete('/api/v1/scholarships/:sc_id', scholarshipController.destroy); //JSend compliant

  app.get('/api/v1/scholarships/:sc_id', scholarshipController.getOne); //JSend compliant

  app.post('/api/v1/scholarships/:sc_id/requirements/:req_id', scholarshipController.addRequirements); //JSend compliant
  app.put('/api/v1/scholarships/:sc_id/requirements/:req_id', scholarshipController.setRequirements); //JSend compliant
  app.delete('/api/v1/scholarships/:sc_id/requirements/:req_id', scholarshipController.removeAssociations); //JSend compliant

  app.get('/api/v1/requirements', requirementController.list); //JSend compliant
  app.post('/api/v1/requirements', requirementController.create); //JSend compliant
  app.put('/api/v1/requirements/:req_id', requirementController.update); //JSend compliant
  app.delete('/api/v1/requirements/:req_id', requirementController.destroy); //JSend compliant

  app.get('/api/v1/requirements/:req_id', requirementController.getOne); //JSend compliant

  app.post('/api/v1/recordsets', recordsetController.create); //JSend compliant
  app.get('/api/v1/recordsets', recordsetController.list); //JSend compliant
  app.get('/api/v1/recordsets/:id', recordsetController.getOne); //JSend compliant
  app.get('/api/v1/recordsets/:id/scholarships', recordsetController.getScholarships); //JSend compliant

  app.post('/api/v1/records', recordController.create);
  app.get('/api/v1/records', recordController.list);

};
