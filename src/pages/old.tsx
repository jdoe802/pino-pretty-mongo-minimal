import { GetStaticProps } from 'next'
import { prettyLogger } from '@/prettyLogger'
import { jsonLogger } from '@/jsonLogger'

function Page() {
  return <div>old page</div>
}

export default Page

export const getStaticProps: GetStaticProps = (ctx) => {
  if (ctx.params?.pretty) {
    prettyLogger.info('pages old getStaticProps pino-pretty working')
  } else {
    jsonLogger.info('pages old getStaticProps pino json working')
  }
  return {
    props: {},
  }
}
