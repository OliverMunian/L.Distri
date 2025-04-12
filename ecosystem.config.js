// Ceci est la version CORRECTE qui devrait être sur GitHub
module.exports = {
  apps : [{
    name   : "ldistri-frontend",
    script : "npm",
    args : "start",
    cwd: './Frontend',
  }, {
    name   : "ldistri-backend",
    script : "npm",
    args : "start",
    cwd: './Backend',
  }]
}
