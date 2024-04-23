const router = require('express').Router();
const userController = require('../controllers/UserController');

// Define routes for user controllers
router.get('/users', userController.getAllDataUser);
router.get('/users/:id', userController.getDataUserById)
router.post('/users', userController.createDataUser);
router.put('/users/:id', userController.updateDataUser);
router.delete('/users/:id', userController.deleteDataUser);

module.exports = router;
