const { Router } = require('express');

const userController = require('../controllers/user-controller');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.delete('/delete', userController.deleteUsers);
router.put('/block', userController.blockUsers);
router.put('/unblock', userController.unblockUsers);

module.exports = router;