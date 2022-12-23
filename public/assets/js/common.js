const url = new URL(location.href);

var requestAPI = function(obj){
    loading.show();
    let config = {
        method: (obj.method===undefined ? 'get' : obj.method),
        url: obj.url,
        data: obj.data,
        params: obj.params,
        timeout: 1000,
    };
    if(obj.json){
        config.headers =  {"Content-Type" : "application/json; charset=utf-8"};
        config.data = JSON.stringify(obj.data);
    }
    axios(config)
    .then(function (response) {
        setTimeout(function() {
            loading.hide();
        }, 200);
        if(response.status!==200){
            alert('서버와 통신중 에러가 발생하였습니다.');
            return;
        }
        obj.callback(response.data);
    })
    .catch(function(res){
        console.log(res)
        setTimeout(function() {
            loading.hide();
        }, 200);
        let err = res.response.data;
        let message = `
            서버와 통신중 에러가 발생하였습니다.
            ${err.code?err.code:''}
            ${err.message?err.message:''}
        `;
        alert(message);
        return;
    });
};

var loading = {
    show : function(){
        $.blockUI({
            //message: '<div class="sk-fold sk-primary mx-auto mb-4"><div class="sk-fold-cube"></div><div class="sk-fold-cube"></div><div class="sk-fold-cube"></div><div class="sk-fold-cube"></div></div><h5 class="text-body">LOADING...</h5>',
            message: `
            <div class="sk-wave sk-primary mx-auto mb-4">
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
            </div>
            <h5 class="text-body" style="color:#fff !important">loading...</h5>
            `,
            css: {
              backgroundColor: 'transparent',
              border: '0',
              zIndex: 9999999
            },
            overlayCSS:  {
              backgroundColor: '#22252B',
              opacity: 0.8,
              zIndex: 9999990
            }
        });
    },
    hide : function(){
        $.unblockUI();
    }
};

const urlSlug = {
    set: (str)=>{
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
    
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^ㄱ-ㅎ가-힣a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
        
        return str;
    }
};

(function(){
    //사이드 메뉴 설정
    $('#layout-sidenav a[href="'+url.pathname+'"]').parents('.sidenav-item').addClass('open');
    $('#layout-sidenav a[href="'+url.pathname+'"]').parent('.sidenav-item').addClass('active');
}());
