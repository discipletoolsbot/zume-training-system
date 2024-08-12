import create_config from '@kucrut/vite-for-wp'
import autoprefixer from 'autoprefixer'
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import path from 'path';

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
                    assetFileNames: `assets/[name].[ext]`,
/*                     manualChunks: {
                        lit: 'lit',
                    } */
                }
            }
        },
        css: {
            postcss: {
                plugins: [
                    autoprefixer({})
                ]
            }
        },
        plugins: [
            getBabelOutputPlugin({
                configFile: path.resolve(__dirname, 'babel.config.js'),
            }),
        ]
    }
)

export default config