const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.post(
    '/handle-form-actions-forced-delete',
    courseController.handleFormActionsForceDelete,
);
router.post('/handle-form-actions', courseController.handleFormActions);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.get('/create', courseController.create);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDelete);
router.get('/:slug', courseController.show);

module.exports = router;
