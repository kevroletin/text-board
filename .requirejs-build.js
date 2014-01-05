({
    appDir: 'app',
    baseUrl: '.',
    dir: 'build',
	mainConfigFile: 'app/amd-modules.js',
    modules: [
        {
            name: 'scripts/main-proxy',
            include: ['scripts/main']
        }
    ],
	optimize: 'none',
	optimizeCss: 'none',
	skipDirOptimize: true
})
