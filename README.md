# Minimal reproduce of pino-pretty crash with Next 13 app directory

Pino is a json logging library that can be used with for example Next.js. There's an
extension called pino-pretty that will output it nicely for development. These
work fine with Next 12 and Next 13 without app folder. But when using app folder
and pino-pretty you currently get a crash like below. This repo aims to
reproduce that error.

`pino({ transport: { target: 'pino-pretty' } })` doesn't work
`pino()` works

## Minimal reproduce of error

`npm i && npm run dev`

| url                                    | works?             | feature   |
| -------------------------------------- | ------------------ | --------- |
| http://localhost:3001                  | :white_check_mark: | app page  |
| http://localhost:3001/api/hello        | :white_check_mark: | app route |
| http://localhost:3001/old              | :white_check_mark: | old pages |
| http://localhost:3001?pretty           | :x:                | app page  |
| http://localhost:3001/api/hello?pretty | :x:                | app route |
| http://localhost:3001/old?pretty       | :white_check_mark: | old pages |

### Error 1

> error - node_modules/thread-stream/index.js (195:31) @ Worker.onWorkerExit
> error - uncaughtException: Error: the worker thread exited
> at Worker.onWorkerExit (webpack-internal:///(sc_server)/./node_modules/thread-stream/index.js:163:34)
> at Worker.emit (node:events:513:28)
> at Worker.[kOnExit] (node:internal/worker:287:10)
> at Worker.<computed>.onexit (node:internal/worker:202:20)
> at Worker.callbackTrampoline (node:internal/async_hooks:130:17)
> null

### Error 2

> error - uncaughtException: Error: Cannot find module 'next13-app-pino-pretty/.next/server/app/lib/worker.js'
> at Function.Module.\_resolveFilename (node:internal/modules/cjs/loader:985:15)
> at Function.Module.\_load (node:internal/modules/cjs/loader:833:27)
> at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
> at MessagePort.<anonymous> (node:internal/main/worker_thread:197:24)
> at MessagePort.[nodejs.internal.kHybridDispatch] (node:internal/event_target:736:20)
> at MessagePort.exports.emitMessage (node:internal/per_context/messageport:23:28) {
> code: 'MODULE_NOT_FOUND',
> requireStack: []
> }

### A workaround
You can pipe to pino-pretty instead.

`npx next dev | pino-pretty`

For example:
```json
"dev": "next dev | pino-pretty -m message -i time -c"
```

---

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# pino-pretty-mongo-minimal
