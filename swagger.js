
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js API Documentation',
            version: '1.0.0',
            description: 'Tài liệu cho API backend của bạn',
        },
        servers: [
            {
                url: 'http://localhost:3001', // thay đổi nếu bạn dùng cổng khác
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // hoặc loại token mà bạn sử dụng
                },
            },
        },
        security: [
            {
                BearerAuth: [], // Tất cả API sẽ yêu cầu Bearer Token
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Vị trí file định nghĩa Swagger
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};

