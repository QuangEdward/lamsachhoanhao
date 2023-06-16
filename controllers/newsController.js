const mongoose = require('mongoose');
const News = require('../models/newsModel');
const fs = require('fs');
const multer = require('multer');
const path = require('path');




const serverUrl = process.env.SERVER_URL|| 'http://localhost:3000';

const addNews = async (req, res) => {
    const images = [];
    if (!req.files.length) {
      return res.status(400).json({ error: 'No image in the request' });
    }

    for (let key = 0; key < 5; key++) {
      const file = req.files[key];
      if (file) {
        const filePath = file.destination + file.filename;
        images.push({ [`image${key}`]: serverUrl + "/" + filePath.split(' ').join('-')});
      } else {
        images.push({ [`image${key}`]: "" });
      }
    }    
    let news = new News({
      title: req.body.title,
      description1: req.body.description1,
      description2: req.body.description2,
      description3: req.body.description3,
      description4: req.body.description4,
      description5: req.body.description5,
      images: images
    });
  try {
    await news.save();
    res.status(202).json({ message: 'Thêm tin tức thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





const getNewsList = async (req, res) => {
  try {
    let perPage = req.query.perPage ?? 20;
    let page = req.query.page ?? 0;
    const newsList = await News.find()
    .limit(perPage)
    .skip(perPage * page)
    .sort({
      createDate: 'desc'
    })
    .exec(function(err, data) {
      News.count().exec(function(err, count) {
        data = {
            data: data,
            perPage: parseInt(perPage),
            count: count
        }
        res.status(200).json(data);
      })
    });
  } catch (error) {         
    res.status(500).json({ error: error.message });
  }


};
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) {
      res.status(404).json({ message: 'Không tìm thấy tin tức' });
    } else {
      res.status(200).json(news);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description1, description2, description3, description4, description5} = req.body;
    let news = await News.findById(id);
    if (!news) {
      res.status(404).json({ message: 'Không tìm thấy tin tức' });
      return;
    }
    const updatedFields = {};
    if (title) {
      updatedFields.title = title;
    }
    if (description1) {
      updatedFields.description1 = description1;
    }
    if (description2) {
      updatedFields.description2 = description2;
    }
    if (description3) {
      updatedFields.description3 = description3;
    }
    if (description4) {
      updatedFields.description4 = description4;
    }
    if (description5) {
      updatedFields.description5 = description5;
    }
    const images = news.images;
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < 5; i++) {
        const filePath = req.files[i].destination + req.files[i].filename;
        const imageIndex = req.body.imageIndex[i];
        images[imageIndex] = { [`image${imageIndex}`]: serverUrl + "/"+ filePath.split(' ').join('-')  };
      }
    }
    news = await News.findByIdAndUpdate(id, { $set: updatedFields, images }, { new: true });
    res.status(200).json({ message: 'Cập nhật tin tức thành công', news: news });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  
  const deleteNews = async (req, res) => {
    try {
      const { id } = req.params;
      await News.findByIdAndDelete(id);
      res.status(200).json({ message: 'Xóa tin tức thành công' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    addNews,
    getNewsList,
    getNewsById,
    updateNews,
    deleteNews
  };
  



