const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');
const authMiddleware = require('../middleware/auth'); 
router.post('/policies', policyController.createPolicy);
router.get('/policies', authMiddleware, policyController.getAllPolicies);
module.exports = router;