module.exports = {
  apps: [{
    name: 'maqola-back',
    script: 'dist/main.js',
    cwd: __dirname,
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
    },
    merge_logs: true,
    time: true,
  }],
};
