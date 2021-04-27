(function CreatePluginEngine () {
    addEventListener('load', function () {
        const scriptElement = document.createElement('script')
        scriptElement.src = '/fatewa/plugins/index.js'
        scriptElement.type = 'module'
        document.body.append(scriptElement)
    })
})()
