# Reproduction Steps

- Edit [mikro orm config](src/mikro-orm.config.ts) adding your local db
- Run `mikro-orm migration:up`
- Run `sls offline`
- Run `curl --location --request POST 'http://localhost:3000/dev/book'`

## Expected behavior

A new book would be added

## Actual behavior

Fails with
Error:
ValidationError: Trying to persist not discovered entity of type Book. Entity with this name was discovered, but not the
prototype you are passing to the ORM. If using EntitySchema, be sure to point to the implementation via `class`.
at Function.notDiscoveredEntity (/serverless-offline-bug/node_modules/@mikro-orm/core/errors.js:50:16)
at SqlEntityManager.persist (/serverless-offline-bug/node_modules/@mikro-orm/core/EntityManager.js:554:48)
at SqlEntityManager.persistAndFlush (/serverless-offline-bug/node_modules/@mikro-orm/core/EntityManager.js:566:20)
at handler (/serverless-offline-bug/src/functions/book/handler.ts:17:6)
at processTicksAndRejections (node:internal/process/task_queues:96:5)
at async runRequest (/serverless-offline-bug/node_modules/@middy/core/index.js:86:26)
at async InProcessRunner.run (
/serverless-offline-bug/node_modules/serverless-offline/dist/lambda/handler-runner/in-process-runner/InProcessRunner.js:
222:28)
at async LambdaFunction.runHandler (
/serverless-offline-bug/node_modules/serverless-offline/dist/lambda/LambdaFunction.js:368:20)
at async hapiHandler (/serverless-offline-bug/node_modules/serverless-offline/dist/events/http/HttpServer.js:747:18)
at async exports.Manager.execute (/serverless-offline-bug/node_modules/@hapi/hapi/lib/toolkit.js:60:28)
at async Object.internals.handler (/serverless-offline-bug/node_modules/@hapi/hapi/lib/handler.js:46:20)
at async exports.execute (/serverless-offline-bug/node_modules/@hapi/hapi/lib/handler.js:31:20)
at async Request._lifecycle (/serverless-offline-bug/node_modules/@hapi/hapi/lib/request.js:371:32)
at async Request._execute (/serverless-offline-bug/node_modules/@hapi/hapi/lib/request.js:281:9)

Please note in [handler](src/functions/book/handler.ts) line 15, this is true if we ts-node index.ts or if we deploy
remotely. Additionally if we comment line 17 this works, but this is not what is intended from Mikro-orm.

You may want to have a look at [this](https://github.com/mikro-orm/mikro-orm/issues/1131#issuecomment-734731336) discussion as well