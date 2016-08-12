/**
 * Created by jiuyuong on 2016/8/11.
 */
L.SheetGroup = L.FeatureGroup.extend({

});
L.sheetGroup = function (options) {
    return new L.SheetGroup(options);
};

L.Path.include({
    edit:function () {
        this.editing &&  this.editing.enable();
        this.dragging && this.dragging.enable();
    },
    cancelEdit:function () {
        this.editing &&  this.editing.disable();
        this.dragging && this.dragging.disable();
    }
})