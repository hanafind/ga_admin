Dropzone.autoDiscover = false;
$(function(){
    //웹에디터
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

      //달력
      $('#datepicker-base, #publish-date').datepicker({
      });

      //커버 이미지 업로드
      $("div#cover_image_upload").dropzone({
        //autoProcessQueue: false,
        paramName: 'file',
        url: "/api/blogs/attach?type=cover_image",
        addRemoveLinks:  true,
        complete: (res)=>{
          //res = JSON.parse(res.xhr.response);
          //let html = `<p><img src="${res.mobile_path}" /></p><p><img src="${res.original_path}" /></p>`;
          //$('.ql-editor').append(html);
        }
      });

      //칸텐츠 이미지 업로드
      $("div#contetns_image").dropzone({
        //autoProcessQueue: false,
        paramName: 'file',
        url: "/api/blogs/attach?type=contents_image",
        addRemoveLinks:  true,
        complete: (res)=>{
          //res = JSON.parse(res.xhr.response);
          //let html = `<p><img src="${res.mobile_path}" /></p><p><img src="${res.original_path}" /></p>`;
          //$('.ql-editor').append(html);
        }
      });

      $('#btn_submit').off('click').on('click', function(){
        
      });
});