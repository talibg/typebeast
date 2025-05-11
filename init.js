import { randomBytes } from 'crypto'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import { execSync } from 'child_process'

const generateKey = (length) => randomBytes(length).toString('hex')

const main = async () => {
    console.log('🔧 Installing root dependencies...')
    execSync('pnpm install', { stdio: 'inherit' })

    console.log('🔧 Building apps/database...')
    execSync('pnpm exec tsc', {
        cwd: resolve('apps/database'),
        stdio: 'inherit',
    })

    console.log('🔧 Generating apps/api/.env...')
    const apiEnvPath = resolve('apps/api', '.env')
    const jwtSecret = generateKey(32)
    const jwtRefreshSecret = generateKey(32)
    const content = [
        'PORT=3000',
        `JWT_SECRET='${jwtSecret}'`,
        `JWT_REFRESH_SECRET='${jwtRefreshSecret}'`,
    ].join('\n')

    await writeFile(apiEnvPath, content, 'utf8')
    console.log(`✔  .env written to ${apiEnvPath}`)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
