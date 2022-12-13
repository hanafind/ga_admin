$(function(){
    if (!window.Quill) {
        return $('#quill-editor,#quill-toolbar,#quill-bubble-editor,#quill-bubble-toolbar').remove();
      }
    
      var editor = new Quill('#quill-editor', {
        modules: {
          toolbar: '#quill-toolbar'
        },
        placeholder: 'Type something',
        theme: 'snow'
      });
      $('#datepicker-base, #publish-date').datepicker({
      });

      $('#btn_submit').off('click').on('click', function(){
        
      });
});