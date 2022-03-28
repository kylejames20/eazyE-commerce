const router = require('express').Router();
const { result } = require('lodash');
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res, next) => {
  const theTags = await Tag.findAll({
    include: [{ model: Product }]
  }).catch(next);
  res.json(theTags);
});

router.get('/:id', async (req, res, next) => {
  const tagsID = await Tag. findByPk(req.params.id, {
    include: [{ model: Product }]
  }).catch(next);
  res.json(tagsID);
});

router.post('/', async (req, res, next) => {
  await Tag.create({
    tag_name: req.body.tag_name
  }).then(success => res.json({ created: true })).catch(next);
});

router.put('/:id', async (req, res, next) => {
  await Tag.update({
    tag_name: req.body.tag_name
  },
    {
      where: { id: req.params.id }
    }).then(result => res.json({ success: true, updated_name: req.body.tag_name })).catch(next);
});

router.delete('/:id', async (req, res, next) => {
  await Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(success => res.json({ deleted: true })).catch(next);
});

module.exports = router;