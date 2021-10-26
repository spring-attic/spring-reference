'use strict'

module.exports.register = (pipeline, { playbook, config }) => {
    pipeline.on('contentAggregated', ({ contentAggregate }) => {
        contentAggregate.forEach(ca => {
            ca.files.filter(f => f.path === 'antora.component.version').forEach(f => {
                const fullVersion = f.contents.toString().trim();
                const separatorIndex = fullVersion.indexOf("-");
                const version = separatorIndex > 0 ? fullVersion.substr(0, separatorIndex) : fullVersion;
                const prerelease = separatorIndex > 0 ? fullVersion.substr(separatorIndex) : undefined;
                ca.version = version;
                if (prerelease) {
                    ca.prerelease = prerelease;
                }
            });
        });
    });
}