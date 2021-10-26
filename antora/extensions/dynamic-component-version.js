'use strict'

module.exports.register = (pipeline, { playbook, config }) => {
    pipeline.on('contentAggregated', ({ contentAggregate }) => {
        contentAggregate.forEach(ca => {
            ca.files.filter(f => f.path === 'antora.component.version').forEach(f => {
                const version = f.contents.toString().trim();
                ca.version = version;
            });
        });
    });
}