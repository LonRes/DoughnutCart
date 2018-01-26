const fs = require('fs')
const path = require('path')
const send = require('koa-send')
const Koa = require('koa')
const app = new Koa()

const doughnuts = JSON.parse(
  fs.readFileSync(path.join(__dirname, './doughnuts.json'), 'utf8')
)

app.use(async (ctx, next) => {
  const doughnutPath = /doughnuts\/page\/(\d+)/
  if (doughnutPath.test(ctx.path)) {
    const index = Number(ctx.path.match(doughnutPath)[1])
    const body = {
      data: [{...doughnuts[index]}],
      next: doughnuts[index + 1] ? index + 1 : null
    }

    ctx.response.body = body
  } else {
    await next()
  }
})

// required to prevent access to private files (eg, ".../.../secrets/aws.pem")
const rootFolder = path.join(__dirname, 'static')

const exists = check => {
  check = path.join(rootFolder, check)
  return new Promise(resolve => {
    fs.stat(check, (err, stats) => {
      resolve(!err && stats.isFile())
    })
  })
}

app.use(async ctx => {
  const path = (await exists(ctx.path)) ? ctx.path : '/index.html'
  await send(ctx, path, {root: rootFolder})
})

app.listen(3000)

console.log('listening on port 3000 🍩')
