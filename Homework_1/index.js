const http = require('http');
let counter = {
    'home': 0,
    'about': 0,
    '404': 0
}

const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    if (req.url === '/') {
        const contentHome = `
            <h1>Добро пожаловать!</h1>
            <a href="/about">About</a>
            <p>Количество просмотров: ${++counter['home']}</p>`;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        }),
        res.end(contentHome);
    } else if (req.url === '/about') {
        const contentAbout = `
            <h1>About</h1>
            <a href="/">Home</a>
            <p>Количество просмотров: ${++counter['about']}</p>`;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        }),
        res.end(contentAbout);
    } else {
        const content404 = `
            <h1>404 - Страница не найдена</h1>
            <p>Количество просмотров: ${++counter['404']}</p>`;
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
        }),
        res.end(content404);
    }
})

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})