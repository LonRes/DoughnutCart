const fs = require('fs')
const path = require('path')
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

const doughnuts = JSON.parse(
  fs.readFileSync(path.join(__dirname, './doughnuts.json'), 'utf8')
)

app.use(async (ctx, next) => {
  const doughnutPath = /doughnuts\/(\d+)/
  if (doughnutPath.test(ctx.path)) {
    const index = Number(ctx.path.match(doughnutPath)[1])
    const doughnut = {...doughnuts[index]}
    if (doughnuts[index + 1]) doughnut.next = index + 1

    ctx.response.body = doughnut
  } else {
    await next()
  }
})

app.use(serve(path.join(__dirname, './static')))
app.use(serve(path.join(__dirname, './static/build')))

app.listen(3000)

console.log('listening on port 3000 🍩')
