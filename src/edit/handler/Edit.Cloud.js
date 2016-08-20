L.Edit = L.Edit || {};

L.Edit.Cloud = L.Edit.Rectangle.extend({

});

L.Cloud.addInitHook(function () {
    if (L.Edit.Cloud) {
        this.editing = new L.Edit.Cloud(this);

        if (this.options.editable) {
            this.editing.enable();
        }
    }
});
