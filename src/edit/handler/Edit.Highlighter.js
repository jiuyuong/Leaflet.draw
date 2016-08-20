L.Edit.Highlighter = L.Edit.Pen.extend({

});
L.Highlighter.addInitHook(function () {
    this.editing = new L.Edit.Highlighter(this);
    if(this.options.editable)
        this.editing.enable();
});