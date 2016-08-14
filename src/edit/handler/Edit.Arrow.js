/**
 * Created by jiuyuong on 2016/8/11.
 */
L.Edit.Arrow = L.Edit.Line.extend({

});

L.Arrow.addInitHook(function () {
    this.editing = new L.Edit.Arrow(this);
    if(this.options.editable)
    	this.editing.enable();
});