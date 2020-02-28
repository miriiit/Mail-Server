
exports.ReplaceAttr = (KeyList, body) => {
    for (var key in KeyList) {
        if (KeyList.hasOwnProperty(key)) {
            if(key.indexOf('radio') !== -1){
                body = body.replace("#"+KeyList[key]+"#", "checked");
            }else{
                body = body.replace("#"+key+"#", KeyList[key]);
            }
        }
    }
    return body;
}