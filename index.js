const Koa = require('koa')
const app = new Koa()
var logger = require('koa-logger')
var route = require('koa-route')
const path = require('path');
const serve = require('koa-static');
const staticMain = serve(path.join(__dirname));


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
const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
};
const main = ctx => {
    ctx.response.body = 'Hello World';
};
app.use(route.get('/', main));
app.use(route.get('/about', about));



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



app.listen(3000);