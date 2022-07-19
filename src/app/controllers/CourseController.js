const Course = require('../models/Course');
const { mongooseToObject } = require('../../ultis/mongoose');

class CourseController {
    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        // res.json(req.body)
        const formData = req.body;
        formData.thumbnail = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAc2AQkTLMw6nodO1GDkTsnJhzQJA`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({
            slug: req.params.slug,
        })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne(
            {
                _id: req.params.id,
            },
            req.body,
        )
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [DELTE] /courses/:id
    delete(req, res, next) {
        Course.delete({
            _id: req.params.id,
        })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
