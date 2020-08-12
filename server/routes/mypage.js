const express = require('express');
const router = express.Router();

const { mypageController } = require('../controller');

// * GET /mypage
router.get('/', mypageController.root.get);

// * POST /mypage/goal
router.post('/goal', mypageController.goal.post);

// * GET /mypage/getvideolist
router.get('/getvideolist', mypageController.getvideolist.get);

// * POST /mypage/selectvideo
router.post('/selectvideo', mypageController.selectvideo.post);

// * GET /mypage/todaycomplete
router.get('/todaycomplete', mypageController.todaycomplete.get);

// * GET /mypage/getvideolist
router.get('/progress', mypageController.progress.get);

module.exports = router;
