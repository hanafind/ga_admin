let posts_page = 1;
let posts_row = 10;

$(document).ready(function(){
    init();

    $('#btn_search').off('click').on('click', function(){
        getLists(1);
    });

    $('#keyword').off('keydown').on('keydown', function(e){
        if(e.keyCode==13 || e.code=='Enter'){
            getLists(1);
        }
    });

    //카테고리 설정
    requestAPI({
        method: 'get',
        url: '/api/products_direct/categories',
        callback: (data)=>{
          var html = '';
          for(var i=0;i<data.length;i++){
            html += `
            <option value="${data[i].idx}">${data[i].name}</option>
            `;
          }
          $('#category_idx').append(html);
        }
    });
});

let init = ()=>{
    getLists(1);
};

let setLists = (data)=>{
    let total_count = data.total_count;
    data = data.data;
    var html = '';
    for(var i=0;i<data.length;i++){
        html += `
        <tr>
            <th scope="row">${total_count-(posts_page-1)*posts_row-i}</th>
            <td>${data[i].idx}</td>
            <td>${data[i].company_name}</td>
            <td>${data[i].category_name}</td>
            <td><a href="/admin/product_direct/modify?idx=${data[i].idx}">${data[i].name}</a></td>
            <td>${moment(data[i].created_at).format('YYYY-MM-DD')}</td>
            <td>${data[i].is_visible?'공개':'비공개'}</td>
        </tr>
        `;
    }
    $('#list_tb tbody').empty().append(html);

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
          getLists(pageNumber);
        }
    });
};

let getLists = (page)=>{
    posts_page = page;
    //글 검색
    requestAPI({
        method: 'get',
        url: '/api/products_direct/products',
        params: {
            page: posts_page,
            row: posts_row,
            category_idx: $('#category_idx').val(),
            is_visible: $('#is_visible').val(),
            keyword: $('#keyword').val(),
        },
        callback: (data)=>{
            setLists(data);
        }
    });
};