const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Course = new Schema(
    {
        _id: {
            type: Number,
        },
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        level: {
            type: String,
        },
        videoId: {
            type: String,
        },
        slug: {
            type: String,
            slug: 'name',
            unique: true,
        },
    },
    {
        _id: false,
        timestamps: true,
    },
);

//Add plugin
mongoose.plugin(slug);

Course.plugin(AutoIncrement);
Course.plugin(
    mongooseDelete,
    {
        overrideMethods: 'all',
    },
    {
        deletedAt: true,
    },
);

module.exports = mongoose.model('Course', Course);
