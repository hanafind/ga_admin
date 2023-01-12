let posts_page = 1;
let posts_row = 10;

$(document).ready(function(){
    init();

    $('#btn_search').off('click').on('click', function(){
        getPosts(1);
    });

    $('#keyword').off('keydown').on('keydown', function(e){
        if(e.keyCode==13 || e.code=='Enter'){
            getPosts(1);
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
            <option value="${data[i].idx}">${data[i].name_ko}</option>
            `;
          }
          $('#category_idx').append(html);
        }
      });
});

let init = ()=>{
    getPosts(1);
};

let setPosts = (data)=>{
    let total_count = data.total_count;
    data = data.data;
    var html = '';
    for(var i=0;i<data.length;i++){
        html += `
        <tr>
            <th scope="row">${total_count-(posts_page-1)*posts_row-i}</th>
            <td>${data[i].idx}</td>
            <td>${data[i].name_ko}</td>
            <td><a href="/admin/blog/modify?idx=${data[i].idx}">${data[i].title}</a></td>
            <td>0</td>
            <td>${moment(data[i].created_at).format('YYYY-MM-DD')}</td>
            <td>${moment(data[i].posting_date).format('YYYY-MM-DD')}</td>
            <td>${!data[i].audit_grant_end_date?'': moment(data[i].audit_grant_start_date).format('YYYY-MM-DD') + '~' + moment(data[i].audit_grant_end_date).format('YYYY-MM-DD')}</td>
            <td>${data[i].is_visible?'공개':'비공개'}</td>
        </tr>
        `;
    }
    $('#posts_tb tbody').empty().append(html);

    console.log(total_count +''+ data.length)
    $('.pagination-container').empty().pagination({
        items: total_count,
        itemsOnPage: posts_row,
        useAnchors : false,
        displayedPages : 5,
        currentPage : posts_page,
        cssStyle: 'light-theme',
        onPageClick :  function(pageNumber, event){
          console.log(pageNumber);
          getPosts(pageNumber);
        }
    });
};

let getPosts = (page)=>{
    posts_page = page;
    //글 검색
    requestAPI({
        method: 'get',
        url: '/api/blogs/posts',
        params: {
            page: posts_page,
            row: posts_row,
            category_idx: $('#category_idx').val(),
            is_visible: $('#is_visible').val(),
            keyword: $('#keyword').val(),
        },
        callback: (data)=>{
            setPosts(data);
        }
    });
};