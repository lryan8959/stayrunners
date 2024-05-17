module.exports = {
  apps: [
    {
      name: 'nestjs-app',
      script: './dist/main.js',
      args: './src/main.ts',
      instances: 'max',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
