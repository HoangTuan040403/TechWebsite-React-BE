
const express = require("express");
const dotenv = require('dotenv');
const { default: mongoose } = require("mongoose");
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// 👉 Thêm phần này
const { swaggerUi, specs } = require('../swagger'); // Đường dẫn ra file swagger.js ở root

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(cookieParser());

// Dòng này để tạo tài liệu API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect DB success!');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log('Server is running in port: ', port);
    console.log(` Swagger Docs: http://localhost:${port}/api-docs`);
});
