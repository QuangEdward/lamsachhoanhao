const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const multer = require('multer');
const path = require('path');


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
  }
  const uploadPath = 'uploads/news/';
  const storageImg = multer.diskStorage({
      destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');
    
        if (isValid) {
            uploadError = null
        }
        cb(uploadError, uploadPath)
      },
      filename: function (req, file, cb) {
    
        const fieldName = file.fieldname;
        const fileName = `${fieldName}-${Date.now()}-${file.originalname}`;
        cb(null, fileName);
      }
  })
  const upload = multer({storage: storageImg});
module.exports = upload;


/**
 * @swagger
 * tags:
 *   name: News
 *   description: The news managing API
 * /api/News:
 *   post:
 *     summary: Create a new article
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       500:
 *         description: Some server error
 *
 */
router.post('/', upload.any(),  newsController.addNews);
/**
 * @swagger
 * tags:
 *   name: News
 *   description: The news managing API
 * /api/News:
 *   get:
 *     summary: Get list article
 *     tags: [News]
 *     parameters: 
 *       - in: query
 *         name: perPage
 *         type: integer
 *         default: 20
 *       - in: query
 *         name: page
 *         type: integer
 *         default: 0
 *     responses:
 *       200:
 *         description: The created news.
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/News'
 *       500:
 *         description: Some server error
 *
 */
router.get('/', newsController.getNewsList);

/**
 * @swagger
 * tags:
 *   name: News
 *   description: The news managing API
 * /api/News/{id}:
 *   get:
 *     summary: Get the news by id
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news id
 *     responses:
 *       200:
 *         description: The news response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: The news was not found
 *
 */
router.get('/:id', newsController.getNewsById);

router.patch('/:id',upload.any(), newsController.updateNews);


router.delete('/:id', newsController.deleteNews);

module.exports = router;
