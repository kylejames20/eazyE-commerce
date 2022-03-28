const router = require('express').Router();
const { result } = require('lodash');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const theCategories = await Category.findAll({
    include: [{model: Product}]
  }).catch(next);
  res.json(theCategories);
});

router.get('/:id', async (req, res) => {
  const getCatByID = await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  }).catch(next);
  res.json(getCatByID);
});

router.post('/', async (req, res, next) => {
  await Category.create({
    cat_name: req.body.cat_name
  }).then(success => res.json({created: true})).catch(next);
});

router.put('/:id', async (req, res, next) => {
  await Category.update({
    cat_name: req.body.cat_name
  },
    {
      where: { id: req.params.id }
    }).then( result => res.json({ success: true, update_name: req.body.cat_name})).catch(next)
});

router.delete('/:id', async (req, res, next) => {
  await Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(success => res.json({ deleted: true })).catch(next)
});

module.exports = router;