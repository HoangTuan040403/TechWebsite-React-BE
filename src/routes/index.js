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
const CategoryChildRouter = require('./CategoryChildRouter');
const RomProductRouter = require('./RomProductRouter');
const ReviewProductRouter = require('./ReviewProductRouter');
const ColorProductRouter = require('./ColorProductRouter');







const routes = (app) => {
    app.use('/api/users', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/categories', CategoryRouter);
    app.use('/api/categories-child', CategoryChildRouter);
    app.use('/api/rom-product', RomProductRouter);
    app.use('/api/reviews', ReviewProductRouter);
    app.use('/api/color-product', ColorProductRouter);




};

module.exports = routes;
