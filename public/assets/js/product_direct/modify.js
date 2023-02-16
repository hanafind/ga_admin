const idx = url.searchParams.get('idx');

const getCategory = ()=>{
    //카테고리 설정
    requestAPI({
        method: 'get',
        url: '/api/products_direct/categories',
        callback: (data)=>{
            var html = '';
            for(var i=0;i<data.length;i++){
                html += `
                <label class="form-check form-check-inline">
                    <input name="category_idx" class="form-check-input" type="radio" value="${data[i].idx}">
                    <span class="form-check-label">
                        ${data[i].name}
                    </span>
                </label>
                `;
            }
            $('.category-area').append(html);
            getCompany();
        }
    });
}

getCategory();

const getCompany = ()=>{
    //보험사 설정
    requestAPI({
        method: 'get',
        url: '/api/products_direct/companies',
        callback: (data)=>{
            var html = '';
            for(var i=0;i<data.length;i++){
                html += `
                <option value="${data[i].idx}">${data[i].name}</option>
                `;
            }
            $('#company_idx').append(html);
            getProduct();
        }
    });
}

const getProduct = ()=>{
    requestAPI({
        method: 'get',
        url: '/api/products_direct/product',
        params: {
            idx: idx
        },
        callback: (data)=>{
            data = data[0];
            $('#product_visible').prop('checked', data.is_visible);
            $(`input[name='category_idx'][value="${data.category_idx}"`).prop("checked", true);
            $('#company_idx option[value="'+data.company_idx+'"]').attr('selected', true);
            $('#product_name').val(data.name);
            $('#product_description').val(data.description);
            $('#product_url').val(data.url);
            
        }
    });
};

//글 작성
$('#btn_submit').off('click').on('click', function(){

    let data = {
        idx: idx,
        is_visible: $('#product_visible').is(':checked'),
        category_idx: $(":input:radio[name=category_idx]:checked").val(),
        company_idx: $('#company_idx').val(),
        product_name: $('#product_name').val(),
        product_description: $('#product_description').val(),
        product_url: $('#product_url').val()
    };
    
    if(!data.category_idx){
      alert('카테고리를 선택해주세요.');
      return;
    }

    if(!data.company_idx){
      alert('보험사를 선택해주세요.');
      return;
    }

    if(!data.product_name){
      alert('상품명을 입력해주세요.');
      return;
    }
    
    if(!data.product_url){
      alert('URL을 입력해주세요.');
      return;
    }
    
    let url_regex = /^(http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(:[0-9]+)?(\/.*)?$/i;
    if(!url_regex.test(data.product_url)){
        alert('URL 형식에 맞지 않습니다.');
        return;
    }
    
    requestAPI({
      method: 'put',
      url: '/api/products_direct/product',
      data: data,
      callback: (data)=>{
        alert('상품 수정을 완료하였습니다.');
        //location.href='/admin/product_direct/list';
      }
    });
    
});

