let recommends = [];

//getRecommendPosts();
$(document).ready(()=>{
    getRecommends();
});

$('#product_idx').off('keydown').on('keydown', function(e){
    if(e.keyCode==13 || e.code=='Enter'){
        getProduct($(this).val());
    }
});

$('#btn_search').off('click').on('click', function(){
    getProduct($('#product_idx').val());
});

const getProduct = (idx)=>{
    if(!idx){
        alert('보험상품(다이렉트) 고유번호를 입력하세요.');
        return;
    }
    requestAPI({
        method: 'get',
        url: '/api/products_direct/product',
        params: {
            idx: idx
        },
        callback: (data)=>{
            data = data[0];
            if(!data){
                alert('조회된 상품이 없습니다.');
                return;
            }
            if(!confirm(`보험사:${data.company_name}\n상품명:${data.name}\n추가하시겠습니까?`)){
                return;
            };
            recommends.push(idx);
            setRecommends();
        }
    });
};

//추천 포스트 설정
let setRecommends = ()=>{
    requestAPI({
        method: 'post',
        url: '/api/products_direct/recommends',
        json: true,
        data: recommends,
        callback: (data)=>{
            getRecommends();
        }
    });
}


let getRecommends = ()=>{
    requestAPI({
        method: 'get',
        url: '/api/products_direct/recommends',
        callback: (data)=>{
            recommends = [];
            let html = '';
            for(let i=0;i<data.length;i++){
                recommends.push(data[i].idx);
                html += `
                <tr data-idx="${data[i].idx}">
                    <td>${i+1}</td>
                    <td>${data[i].idx}</td>
                    <td>${data[i].company_name}</td>
                    <td>${data[i].category_name}</td>
                    <td>${data[i].name}</td>
                    <td><a href="${data[i].url}}" target="_blank">바로가기</a></td>
                    <td><button type="button" class="btn btn-danger btn_delete" data-idx="${data[i].idx}">삭제</button></td>
                </tr>
                `;
            }
            $('#recommend_list tbody').empty().append(html);
            $('.btn_delete').off('click').on('click', function(){
                if(!confirm('삭제 하시겠습니까?')){
                    return;
                }
                $(`#recommend_list tbody tr[data-idx="${$(this).attr('data-idx')}"]`).remove();
                recommends = [];
                $.each($('#recommend_list tbody tr'), function(index, item){
                    recommends.push($(this).attr('data-idx'));
                });
                setRecommends();
            });
            Sortable.create(document.getElementById('sort_list'), {
                animation: 300,
                onEnd: function(evt){
                    recommends = [];
                    $.each($('#recommend_list tbody tr'), function(index, item){
                        recommends.push($(this).attr('data-idx'));
                    });
                    setRecommends();
                }
            });
        }
    });
};