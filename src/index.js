const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const db = require('./config/db');
const route = require('./routes/index');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom Middlewares
app.use(SortMiddleware);

// app.use(middlewareExample);

// middleware example
function middlewareExample(req, res, next) {
    if (['vethuong', 'vevip'].includes(req.query.ve)) {
        req.face = 'Gach gach gach';
        return next();
    }
    res.status(403).json({
        message: 'access denied',
    });
}

//HTTP logger
// app.use(morgan('combined'))

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fa-solid fa-sort',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
                </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
