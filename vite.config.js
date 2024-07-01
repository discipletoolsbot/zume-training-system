import create_config from '@kucrut/vite-for-wp'
import autoprefixer from 'autoprefixer'

const config = create_config(
    [
        'site/assets/src/main.js',
    ],
    'site/assets/dist',
    {
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name]-bundle.js`,
                    chunkFileNames: `assets/[name]-bundle.js`,
                    assetFileNames: `assets/[name].[ext]`
                }
            }
        },
        css: {
            postcss: {
                plugins: [
                    autoprefixer({})
                ]
            }
        }
    }
)

export default config