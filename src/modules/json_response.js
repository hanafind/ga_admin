const success = (res, obj) => {
    console.log(111);
    res.status(200).json(obj);
}

const error = async(res, obj, err) => {
    console.log(222);
    if(process.env.NODE_ENV !== 'production'){
        console.log(err);
    }
    let errorInfo = await errorCodeHandler(obj.code);
    /*
    if(obj.innerError){
        errorInfo.innerError = obj.innerError; //innerError: {target: "", message: ""}
    }
    */
    res.status(errorInfo[0].code).json(errorInfo[0]).end();
};

const errorCodeHandler = async(code)=>{
    const errors = 
    [
        { code : 100 , message : "continue"},                            //"계속"
        { code : 101 , message : "switching protocols"},                 //"스위칭 프로토콜"
        { code : 102 , message : "processing"},                          //"가공"
        { code : 200 , message : "ok"},                                  //"확인"
        { code : 201 , message : "created"},                             //"생성됨"
        { code : 202 , message : "accepted"},                            //"수락 됨"
        { code : 203 , message : "non-authoritative information"},       //"신뢰할 수없는 정보"    
        { code : 204 , message : "no content"},                          //"내용 없음"
        { code : 205 , message : "reset content"},                       //"내용 재설정"
        { code : 206 , message : "partial content"},                     //"일부 내용"
        { code : 207 , message : "multi-status"},                        //"다중 상태"
        { code : 208 , message : "already reported"},                    //"이미보고 됨"
        { code : 226 , message : "im used"},                             //"사용함"                
        { code : 300 , message : "multiple choices"},                    //"다중 선택"    
        { code : 301 , message : "moved permanently"},                   //"영구 이동"    
        { code : 302 , message : "found"},                               //"발견"
        { code : 303 , message : "see other"},                           //"기타보기"
        { code : 304 , message : "not modified"},                        //"수정되지 않음"    
        { code : 305 , message : "use proxy"},                           //"프록시 사용"    
        { code : 307 , message : "temporary redirect"},                  //"임시 리디렉션"
        { code : 308 , message : "permanent redirect"},                  //"영구 리디렉션"
        { code : 400 , message : "bad request"},                         //"잘못된 요청"        
        { code : 401 , message : "unauthorized"},                        //"승인되지 않음"    
        { code : 402 , message : "payment required"},                    //"결제 필요"        
        { code : 403 , message : "forbidden"},                           //"금지"        
        { code : 404 , message : "not found"},                           //"찾을 수 없음"        
        { code : 405 , message : "method not allowed"},                  //"허용되지 않는 방법"                
        { code : 406 , message : "not acceptable"},                      //"허용되지 않음"            
        { code : 407 , message : "proxy authentication required"},       //"프록시 인증 필요"            
        { code : 408 , message : "request timeout"},                     //"요청 시간 초과"        
        { code : 409 , message : "conflict"},                            //"충돌"        
        { code : 410 , message : "gone"},                                //"사라짐"        
        { code : 411 , message : "length required"},                     //"길이 필요"    
        { code : 412 , message : "precondition failed"},                 //"전제 조건 실패"    
        { code : 413 , message : "payload too large"},                   //"페이로드가 너무 큼"    
        { code : 414 , message : "uri too long"},                        //"uri가 너무 김"        
        { code : 415 , message : "unsupported media type"},              //"지원되지 않는 미디어 유형"        
        { code : 416 , message : "range not satisfiable"},               //"범위가 만족스럽지 않음"        
        { code : 417 , message : "expectation failed"},                  //"예상 실패"        
        { code : 418 , message : "I'm a teapot"},                        //"나는 찻 주전자입니다"    
        { code : 422 , message : "unprocessable entity"},                //"처리 할 수없는 엔티티"        
        { code : 423 , message : "locked"},                              //"잠김"        
        { code : 424 , message : "failed dependency"},                   //"실패한 종속성"        
        { code : 426 , message : "upgrade required"},                    //"업그레이드 필요"        
        { code : 428 , message : "precondition required"},               //"전제 조건 필요"        
        { code : 429 , message : "too many requests"},                   //"너무 많은 요청"                     
        { code : 431 , message : "request header fields too large"},     //"요청 헤더 필드가 너무 큼"        
        { code : 500 , message : "internal server error"},               //"내부 서버 오류"        
        { code : 501 , message : "not implemented"},                     //"구현되지 않음"        
        { code : 502 , message : "bad gateway"},                         //"잘못된 게이트웨이"        
        { code : 503 , message : "service unavailable"},                 //"서비스를 사용할 수 없음"        
        { code : 504 , message : "gateway timeout"},                     //"게이트웨이 시간 초과"            
        { code : 505 , message : "http version not supported"},          //"지원되지 않는 http 버전"            
        { code : 506 , message : "variant also negotiates"},             //"변형도 협상"            
        { code : 507 , message : "insufficient storage"},                //"저장 용량 부족"        
        { code : 508 , message : "loop detected"},                       //"루프 감지 됨"        
        { code : 510 , message : "not extended"},                        //"확장되지 않음"        
        { code : 511 , message : "network authentication required"}      //"네트워크 인증 필요"
    ];
    return errors.filter(function(e){
        return (e.code === code);
    });
};

module.exports = {
    success: success,
    error: error
}