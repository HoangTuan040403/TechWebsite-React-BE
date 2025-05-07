// const UserRouter = require('./UserRouter')
// const ProductRouter = require('./ProductRouter')

// const routes = (app) => {
//     app.use('/api/user', UserRouter)
//     app.use('/api/product', ProductRouter)


// }

// module.exports = routes  

const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const CategoryRouter = require('./CategoryRouter');

const routes = (app) => {
    app.use('/api/users', UserRouter);
    app.use('/api/products', ProductRouter);
    app.use('/api/categories', CategoryRouter);
};

module.exports = routes;
