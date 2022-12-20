let posts_page = 1;
let posts_row = 5;

document.addEventListener("DOMContentLoaded", function(){
    init();   
});

let init = ()=>{
    getPosts(1);
};

let getPosts = (page)=>{
    posts_page = page;
    //글 검색
    requestAPI({
        method: 'get',
        url: '/api/blogs/posts',
        params: {
            page: page,
            row: posts_row
        },
        callback: (data)=>{
            setPosts(data);
        }
    });
};

$('#board-paging').pagination({
    dataSource: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?',
    locator: 'items',
    totalNumberLocator: function(response) {
        // you can return totalNumber by analyzing response content
        return Math.floor(Math.random() * (1000 - 100)) + 100;
    },
    pageSize: 20,
    ajax: {
        beforeSend: function() {
            dataContainer.html('Loading data from flickr.com ...');
        }
    },
    callback: function(data, pagination) {
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})

let setPosts = (data)=>{
    data = data.data;
    var html = '';
    for(var i=0;i<data.length;i++){
        html += `
        <tr>
            <th scope="row">31</th>
            <td>${data[i].idx}</td>
            <td>${data[i].name_ko}</td>
            <td><a href="#">${data[i].title}</a></td>
            <td>0</td>
            <td>${moment(data[i].created_at).format('YYYY-MM-DD')}</td>
            <td>${moment(data[i].posting_date).format('YYYY-MM-DD')}</td>
            <td>${!data[i].audit_grant_end_date?'': moment(data[i].audit_grant_start_date).format('YYYY-MM-DD') + '~' + moment(data[i].audit_grant_end_date).format('YYYY-MM-DD')}</td>
            <td>${data[i].is_visible?'공개':'비공개'}</td>
        </tr>
        `;
    }
    $('#posts_tb tbody').empty().append(html);
};