const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - images
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the news
 *         title:
 *           type: string
 *           description: The title of your news
 *         description:
 *           type: string
 *           description: The news description
 *         images:
 *           type: file
 *           description: The news images
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the news was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         description: Alexander K. Dewdney
 *         image: ["http://localhost:5000/uploads/news/img.jpg"]
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
const NewsSchema = mongoose.Schema({
    title: { type: String}, 
    description1: { type: String, default: ""},
    description2: { type: String, default: ""},
    description3: { type: String, default: "" },
    description4: { type: String, default: "" },
    description5: { type: String, default: "" },
    images: {type: Array },
    createDate: { type: Date, default: Date.now} 
}, { toJSON: { getters: true, virtuals: true} });

NewsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


module.exports = mongoose.model('news', NewsSchema);
