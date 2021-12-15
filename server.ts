import 'reflect-metadata'
import 'dotenv/config'
import { setup } from './app'

async function serveApp() {
  await setup()
}

serveApp()
