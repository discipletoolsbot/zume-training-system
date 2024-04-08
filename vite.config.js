import create_config from '@kucrut/vite-for-wp'

const config = create_config(
    [
        'site/assets/src/main.js',
    ],
    'site/assets/dist',
    {
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name].js`,
                    chunkFileNames: `assets/[name].js`,
                    assetFileNames: `assets/[name].[ext]`
                }
            }
        }
    }
)

export default config