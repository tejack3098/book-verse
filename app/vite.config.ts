import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3002
  },
  plugins: [
    react(),
    VitePWA
    ({
      
       registerType: 'autoUpdate',
       injectRegister: 'auto',
       //service worker
       strategies: 'generateSW',
       devOptions:{
        enabled: true,
       },
       manifest:{
        name: "Bookverse",
        short_name: "BVRS",
        start_url: "/",
        display: "standalone",
        background_color: "#FFFFF",
        description : "Ecommerce Book Store",
        theme_color: "#FFFFF",
        icons: [
          {
            "src": "public/images/pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "public/images/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "public/images/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "public/images/maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]


       },

       workbox:{
        runtimeCaching: [
          {
            urlPattern: ({url}) => {
              return url.pathname.includes('public');
            },
            handler: 'CacheFirst',
            method:'GET',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60*60*24*30,
                

              },
              cacheableResponse: {  statuses: [0, 200] },

            }
          },
          {
            urlPattern: ({url}) => {
              return url.pathname.includes('books');
            },
            handler: 'CacheFirst',
            method:'GET',
            options: {
              cacheName: 'books-api',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60*60*24*30,
                

              },
              cacheableResponse: {  statuses: [0, 200] },

            }
          }
        ]
       }


    })
  
  ],

})
