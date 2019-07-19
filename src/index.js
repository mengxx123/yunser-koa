const Koa = require('koa')
const app = new Koa()
var logger = require('koa-logger')
const Router = require('koa-router') // koa 路由中间件
const path = require('path');
const serve = require('koa-static');
const staticMain = serve(path.join(__dirname));
const router = new Router(); // 实例化路由

console.log('process.env.NODE_ENV', process.env.NODE_ENV)


app.use(logger())
// app.use(async ctx => {
//     ctx.body = 'Hello World';
// });

// app.use(async (next) => {
//     var start = new Date;
//     await next();
//     var ms = new Date - start;
//     this.set('X-Response-Time', ms + 'ms');
// });
app.use(async (ctx, next) => {
    var start = new Date;
    await next();
    var ms = new Date - start;
    ctx.set('X-Response-Time', ms + 'ms');
    //
    // await next();
    // ctx.body = 'Hello World';
});

app.use(staticMain);

// app.use(route.get('/', list))
// app.use(route.get('/page/:page', list))
// app.use(route.get('/search/:keywords', search))
// app.use(route.get('/search/:keywords/:page', search))

let devices = [
    {
        id: '1',
        name: '小灯'
    }
]

// route.get('/devices', ctx => {
//     ctx.response.body = {
//         version: '1.0.0',
//         msg: 'asd'
//     }
// })

// route.get('/', main)

// route.get('/about', about)

// 添加url
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name; // 获取请求参数
    ctx.response.body = `<h5>Hello, ${name}!</h5>`;
});

router.get('/about', async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
})

router.get('/', async (ctx, next) => {
    ctx.response.body = {
        version: '1.0.0',
        msg: 'asd'
    }
})

router.get('/asd', async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
})

app.use(router.routes())

// app.use(route.routers)
// app.use(function *(next) {
//     if (!this.path.match(/^\/assets\//)) {
//         yield* next
//         return
//     }
//     var path = __dirname + this.path
//     var fstat = yield stat(path)
//
//     if (fstat.isFile()) {
//         this.type = extname(path)
//         this.body = fs.createReadStream(path)
//     }
// })
//
// app.use(function *(next) {
//     if (this.needRendered) {
//         this.body = yield render(this.templateView, {cache: false, data: this.templateModel})
//     }
//     yield* next
// })


// utils

function stat(file) {
    return function (done) {
        fs.stat(file, done)
    }
}

// routes

// function *list(page, next) {
//     next = arguments[arguments.length - 1]
//     this.templateView = 'page'
//     this.templateModel = yield model.list({page: page})
//     this.needRendered = true
//     yield *next
// }
//
// function *search(keywords, page, next) {
//     next = arguments[arguments.length - 1]
//     this.templateView = 'search'
//     this.templateModel = yield model.search({keywords: keywords, page: page})
//     this.needRendered = true
//     yield *next
// }



app.listen(3000, () => {
    console.log('This server is running at http://localhost:' + 3000)
})
