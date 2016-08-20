L.Draw.Tasks = L.Draw.Features.extend({
    statics: {
        TYPE: 'tasks'
    },

    initialize: function (map, tasks) {
        var _options = {
            actions: []
        },task;
        for(var k in tasks) {
            task = tasks[k];
            _options.actions.push({
                text: task.text,
                description: task.description,
                enabled: task,
                feature: L.Draw.Task
            })
        }
        L.Draw.Features.prototype.initialize.call(this,map,_options);
        this.type = L.Draw.Tasks.TYPE;
    }
});