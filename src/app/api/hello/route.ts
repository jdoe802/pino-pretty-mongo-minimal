import { prettyLogger } from '@/prettyLogger'
import { jsonLogger } from '@/jsonLogger'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  if (searchParams.has('pretty')) {
    prettyLogger.info('api hello route pino-pretty crashes')
  } else {
    jsonLogger.info('api hello route pino works')
  }
  prettyLogger.info('in route.ts')
  return new Response('Hello, Next.js!')
}
