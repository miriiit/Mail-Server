
exports.ReplaceAttr = (KeyList, body) => {
    return new Promise ((resolve, reject) => {
        if(!(body || KeyList)){
            reject("Data is not efficient to consum");
        }
        for (var key in KeyList) {
            if (KeyList.hasOwnProperty(key)) {
                if(key.indexOf('radio') !== -1){
                    let keyValue = KeyList[key];
                    if (keyValue && keyValue !== "") {
                        body = body.replace("#"+KeyList[key]+"#", "checked");
                    }
                }else{
                    body = body.replace("#"+key+"#", KeyList[key]);
                }
            }
        }
        resolve(body);
    });
}