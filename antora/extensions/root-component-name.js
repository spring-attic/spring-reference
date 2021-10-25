// https://gitlab.com/antora/antora/-/issues/132#note_712132072
'use strict'

const { posix: path } = require('path')

module.exports.register = (pipeline, { config }) => {
    pipeline.on('contentClassified', ({ contentCatalog }) => {
        const rootComponentName = config.rootComponentName || 'ROOT'
        const rootComponentNameLength = rootComponentName.length
        contentCatalog.findBy({ component: rootComponentName }).filter((file) => file.out).forEach((file) => {
            file.out.dirname = file.out.dirname.substr(rootComponentNameLength)
            file.out.path = file.out.path.substr(rootComponentNameLength + 1)
            file.out.rootPath = file.out.rootPath.split('/').slice(1).join('/') || '.'
            file.pub.url = file.pub.url.substr(rootComponentNameLength + 1)
            file.pub.rootPath = file.out.rootPath
        })
        const rootComponent = contentCatalog.getComponent(rootComponentName)
        rootComponent?.versions?.forEach((version) => {
            version.url = version.url.substr(rootComponentName.length + 1)
        })
        // const siteStartPage = contentCatalog.getById({ component: '', version: '', module: '', family: 'alias', relative: 'index.adoc' })
        // if (siteStartPage) delete siteStartPage.out
    })
}
