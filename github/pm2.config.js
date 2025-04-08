module.exports = {
  apps: [
    {
      name: "ldistri",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/opt/sites/ldistri",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
