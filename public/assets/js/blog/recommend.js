let recommendPosts = [];

$(document).ready(function(){

    getRecommendPosts();

    $('#post_idx').off('keydown').on('keydown', function(e){
        if(e.keyCode==13 || e.code=='Enter'){
            getPost($(this).val());
        }
    });

    $('#btn_search').off('click').on('click', function(){
        getPost($('#post_idx').val());
    });
/*
    
    */
});

let getPost = (idx)=>{
    if(!idx){
        alert('컨텐츠 고유번호를 입력하세요.');
        return;
    }
    requestAPI({
        method: 'get',
        url: '/api/blogs/post/'+idx,
        callback: (data)=>{
            if(!data || data.length==0){
                alert('잘못된 고유번호를 입력하였습니디.');
                return;
            }
            if(!confirm('"'+data[0].title + '"\n추천 컨텐츠에 추가 하시겠습니까?')){
                return;
            };
            recommendPosts.push(idx);
            setRecommendPosts();
        }
    });
};

let getRecommendPosts = ()=>{
    requestAPI({
        method: 'get',
        url: '/api/blogs/recommends',
        callback: (data)=>{
            recommendPosts = [];
            let html = '';
            for(let i=0;i<data.length;i++){
                recommendPosts.push(data[i].idx);
                html += `
                <div class="col-md-3 mb-4" data-idx="${data[i].idx}">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="mb-0">#${i+1}</h4>
                            <button data-idx="${data[i].idx}" type="button" class="btn btn-sm btn-danger btn_delete">삭제</button>
                        </div>
                        <img class="card-img-top" src="${data[i].cover_image_url}" alt="Card image cap">
                        <div class="card-body">
                        <h4 class="card-title">${data[i].title}</h4>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div class="card-footer">
                            <p class="card-text">고유번호 : ${data[i].idx}</p>
                        </div>
                    </div>
                </div>
                `;
            }
            $('#recommend_list').empty().append(html);
            $('.btn_delete').off('click').on('click', function(){
                if(!confirm('삭제 하시겠습니까?')){
                    return;
                }
                $(`#recommend_list > div[data-idx="${$(this).attr('data-idx')}"]`).remove();
                recommendPosts = [];
                $.each($('#recommend_list > div'), function(index, item){
                    recommendPosts.push($(this).attr('data-idx'));
                });
                setRecommendPosts();
                getRecommendPosts();
            });
            Sortable.create(document.getElementById('recommend_list'), {
                animation: 300,
                onEnd: function(evt){
                    recommendPosts = [];
                    $.each($('#recommend_list > div'), function(index, item){
                        recommendPosts.push($(this).attr('data-idx'));
                    });
                    setRecommendPosts();
                    getRecommendPosts();
                }
            });
        }
    });
};

//추천 포스트 설정
let setRecommendPosts = ()=>{
    requestAPI({
        method: 'post',
        url: '/api/blogs/recommends',
        json: true,
        data: recommendPosts,
        callback: (data)=>{

        }
    });
}
