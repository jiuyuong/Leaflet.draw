/**
 * Created by jiuyuong on 2016/8/14.
 */
L.Edit.Task = L.Edit.SimpleShape.extend({
    addHooks: function () {
        this._setEditStyle();
    },
    removeHooks: function () {
        this._resovleEditStyle();
        this._map = null;
    }
});

L.Task.addInitHook(function () {
    this.editing = new L.Edit.Task(this);
    if(this.options.editable)
        this.editing.enable();
});