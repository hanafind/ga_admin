$(document).ready(function(){
    init();

    $('#btn_submit').off('click').on('click', function(){
        //사이트맵 생성
        requestAPI({
            method: 'post',
            url: '/api/sitemap',
            callback: (data)=>{
                alert('사이트맵 생성 완료');
                init();
            }
        });
    });
});

const init = ()=>{
    //사이트맵 가져오기
    requestAPI({
        method: 'get',
        url: '/api/sitemap',
        callback: (data)=>{
            $('#sitemap-code').val(data);
        }
    });
}