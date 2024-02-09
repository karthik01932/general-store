const express = require('express');

const itemController = require('../controllers/general');

const router = express.Router();

router.post('/item/add-item', itemController.postItems);

router.get('/item/get-items', itemController.getItems);

router.put('/item/edit-items/:userid',  itemController.getEditItem);

// router.post('/item/edit-items/',  itemController.updateItem);

// router.get('/item/getafter-items/:userid',itemController.getafteredited);

router.delete('/item/delete-items/:userid', itemController.deleteItem);

module.exports = router; 