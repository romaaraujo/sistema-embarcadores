const router = require("express").Router();
const authController = require("./controllers/authController");
const offerController = require("./controllers/offerController");
const dashboardController = require("./controllers/dashboardController");
const proposalController = require("./controllers/proposalController");

// views
router.get('/login', authController.index);
router.get('/dashboard', dashboardController.dashboard);

// auth
router.post('/auth/login', authController.login);
router.post('/auth/new', authController.register);

// cargas
router.post('/offer/new', offerController.create);

// lances
router.post('/proposal/new', proposalController.create);
router.get('/proposals/:id', proposalController.view);
router.get('/proposals/winner/:id', proposalController.winner);

module.exports = router;