const { Service } = require('../models/service');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const serviceList = await Service.find().select('name image -_id');

    if (!serviceList) {
        res.status(500).json({ success: false })
    }
    res.send(serviceList);
})

router.get(`/:id`, async (req, res) => {
    const service = await Service.findById(req.params.id).populate('category');

    if (!service) {
        res.status(500).json({ success: false })
    }
    res.send(service);
})


router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category')

    let service = new Service({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        category: req.body.category,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })

    service = await service.save();

    if (!service)
        return res.status(500).send('The service cannot be created')

    res.send(service);

})

router.put('/:id', async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category')

    const service = await Service.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            category: req.body.category,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        },
        { new: true }
    )
    if (!service)
        return res.status(500).send('the service cannot be updated')
    res.send(service);
})

router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'the product is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: 'product not found' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})
module.exports = router;