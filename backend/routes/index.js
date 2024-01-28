const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const {routesConfig} = require("./routesConfig")
const {hashPassword} = require("../utils/helpers");


mongoose
  .connect("mongodb://127.0.0.1:27017/simpleSPA", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.error("Database connection error:", err);
});

const routeModelsList = {}

routesConfig?.forEach((route) => {
  const schemaData = {
    time: String
  };

  route?.fields.forEach((field) => {
    if (field === 'email') return schemaData[field] = { type: String, required: false, unique: true }
    schemaData[field] = String;
  });

  const routeSchema = new mongoose.Schema(schemaData);

  const routeModel = mongoose.model(route.url, routeSchema);

  routeModelsList[route.url] = routeModel;

  router.post("/" + route.url, async (req, res) => {
    try {
      const data = {
        time: new Date().toISOString(),
      }

      for (const field of route.fields) {
        data[field] = req.body[field] || "-";
      }

      console.log(data)
      await routeModel.create(data);
      res.json({status: "200", message: data});

    } catch (e) {
      console.log(e)
      res.status(500).json({status: "500", message: "Internal server error"});
    }
  })


  router.get("/" + route.url, async (req, res) => {
    try {
      let {dataStart, dataEnd} = req.query;
      let objs;

      objs = await routeModel.find({
        time: {
          $gte: dataStart,
          $lte: dataEnd
        }
      });

      if (objs && Array.isArray(objs)) {
        objs = objs.map(obj => {
          route.fields.forEach(field => {
            obj[field] = obj[field] || "-";
          });
          return obj;
        });
      }

      console.log(objs)
      res.json(objs);
    } catch (e) {

    }
  })
})




/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = { router, routesConfig };
