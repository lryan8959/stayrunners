module.exports = {
  apps: [
    {
      name: 'nestjs-app',
      script: './dist/main.js',
      args: './src/main.ts',
      instances: 1,
      watch: true,
 ignore_watch: [
        'uploads', // Ignore changes in the "uploads" directory or route
      ],

      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
