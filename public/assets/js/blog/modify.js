const post_idx = url.searchParams.get('idx');

document.addEventListener("DOMContentLoaded", function(){
    //웹에디터
    tinymce.init({
        selector: 'textarea#html_editor',
        plugins: [
        'codeeditor', 'advlist','autolink',
        'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
        'fullscreen','insertdatetime','media','table','help','wordcount'
        ],
        toolbar: 'codeeditor | undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify |' +
        'bullist numlist checklist outdent indent | removeformat | code table help'
    });

    //달력
    $.fn.datepicker.defaults.format = "yyyy-mm-dd";
    $('#posting_date, #audit_start').datepicker({
    });
    
    //심사필 년
    $('#audit_year').append(
    `
        <option value="${moment().format('YYYY')}">${moment().format('YYYY')}</option>
        <option value="${moment().add(1, 'y').format('YYYY')}">${moment().add(1, 'y').format('YYYY')}</option>
    `
    );

    $('#audit_start').change(function(){
    $('#audit_end').val(moment($(this).val()).add(1, 'years').add(-1, 'days').format('YYYY-MM-DD'));
    });

    //url 슬러그 설정
    $("#post_title").keyup(function() {
        $('#url_slug').val(urlSlug.set($(this).val()));
    });

    //커버 이미지 업로드
    $("div#cover_image_upload").dropzone({
    //autoProcessQueue: false,
    dictDefaultMessage: '여기로 이미지를 드래그 하거나<br>파일을 업로드 하세요.',
    paramName: 'file',
    url: "/api/blogs/attach?type=cover_image",
    uploadMultiple: false,
    init: function() {
        this.on('addedfile', function(file) {
        if (this.files.length > 1) {
            this.removeFile(this.files[0]);
        }
        });
    },
    complete: (res)=>{
        res = JSON.parse(res.xhr.response)[0];
        $('#cover_image').attr('src', res.file_path+res.file_name);
        $('#cover_image_url').val(res.file_path+res.file_name);
        //let html = `<p><img src="${res.mobile_path}" /></p><p><img src="${res.original_path}" /></p>`;
        //$('.ql-editor').append(html);
    }
    });

      //칸텐츠 이미지 업로드
    $("div#contetns_image").dropzone({
        //autoProcessQueue: false,
        dictDefaultMessage: '여기로 이미지를 드래그 하거나<br>파일을 업로드 하세요.',
        paramName: 'file',
        url: "/api/blogs/attach?type=contents_image",
        uploadMultiple: false,
        addRemoveLinks:  true,
        complete: (res)=>{
          res = JSON.parse(res.xhr.response)[0];
          let html = tinymce.activeEditor.getContent();
          html  += `<p><img src="${res.file_path}${res.file_name}" /></p>`;
          tinymce.activeEditor.setContent(html);
        }
    });

    //카테고리 설정
    requestAPI({
        method: 'get',
        url: '/api/blogs/categories',
        callback: (data)=>{
          var html = '';
          for(var i=0;i<data.length;i++){
            html += `
            <label class="form-check form-check-inline">
              <input name="post_category" class="form-check-input" type="radio" value="${data[i].idx}">
              <span class="form-check-label">
                ${data[i].name_ko}
              </span>
            </label>
            `;
          }
          $('.category-area').append(html);
          getPost();
        }
    });
    

    //글 수정
    $('#btn_submit').off('click').on('click', function(){
        if(confirm('수정 하시겠습니까?')){
            updatePost();
        }
    });
});

let getPost = ()=>{
    requestAPI({
        method: 'get',
        url: '/api/blogs/post/'+post_idx,
        callback: (data)=>{
            data = data[0];
            $(`input[name='post_category'][value="${data.category_idx}"`).prop("checked", true);
            $('#cover_image').attr('src', data.cover_image_url);
            $('#cover_image_url').val(data.cover_image_url);
            $('#post_title').val(data.title);
            setTimeout(function(){
                tinymce.activeEditor.setContent(data.contents);
            },500);
            $('#url_slug').val(data.url_slug);
            $('#post_visible').prop('checked', data.is_visible);
            $('#posting_date').val(moment(data.posting_date).format('YYYY-MM-DD'));
            $('#meta_title').val(data.meta_title);
            $('#meta_desc').val(data.meta_desc);
            $('#meta_keyword').val(data.meta_keywords);
            $('#is_audit').prop('checked', data.is_audit);
            if(data.is_audit){
                $('#audit_year').val(data.audit_num_year);
                $('#audit_month').val(data.audit_num_month);
                $('#audit_index').val(data.audit_num_index);
                $('#audit_start').val(moment(data.audit_grant_start_date).format('YYYY-MM-DD'));
                $('#audit_end').val(moment(data.audit_grant_end_date).format('YYYY-MM-DD'));
            }
        }
    });
};

let updatePost = ()=>{
    let data = {
        post_categories_idx: $(":input:radio[name=post_category]:checked").val(),
        title: $('#post_title').val(),
        contents: tinymce.activeEditor.getContent(),
        is_visible: $('#post_visible').is(':checked'),
        meta_title: $('#meta_title').val(),
        meta_desc: $('#meta_desc').val(),
        meta_keywords: $('#meta_keyword').val(),
        audit_num_year: $('#audit_year').val(),
        audit_num_month: $('#audit_month').val(),
        audit_num_index: $('#audit_index').val(),
        audit_grant_start_date: $('#audit_start').val(),
        audit_grant_end_date: $('#audit_end').val(),
        cover_image_url: $('#cover_image_url').val(),
        posting_date: $('#posting_date').val(),
        is_audit: $('#is_audit').is(':checked'),
        url_slug: $('#url_slug').val(),
        idx: post_idx
    };

    
    if(!data.post_categories_idx){
        alert('카테고리를 선택해주세요.');
        return;
    }

    if($('#cover_image').attr('src')==''){
        alert('커버 이미지를 업로드해주세요.');
        return;
    }
    
    if(!data.title){
        alert('제목을 입력해주세요.');
        return;
    }

    if(!posting_date){
        alert('발행일을 입력해주세요.');
        return;
    }

    requestAPI({
        method: 'put',
        url: '/api/blogs/post',
        data: data,
        callback: (data)=>{
            alert('수정이 완료되었습니다.');
        }
    });
}