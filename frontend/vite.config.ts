import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    fs: {
      // Allow serving files from these directories
      allow: [
        // Current project directory
        'E:/KAAR/portal_2/portal_2/frontend',
        // Vendor portal directory
        'E:/KAAR/projects/vendorPortal/frontend',
        // Node modules
        'E:/KAAR/portal_2/portal_2/frontend/node_modules'
      ]
    }
  }
}); 