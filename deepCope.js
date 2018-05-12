function deepCopy(){
    var len = arguments.length;
    if(len===1){
        return arguments[0];
    }else if(len===0){
        return undefined;
    }
    var j=0;
    for(;j<len;j++){
        if(!(arguments[j] instanceof Array)&&!(arguments[j] instanceof Object)){
            throw new TypeError("arguments must be object or array.");
        }
    }
    var src,copy,option,copyIsArr;
    var target = arguments[0] || {};
    var i = 1;
    for(;i<len;i++){
        option = arguments[i];
        for(name in option){
            src = target[name];
            copy = option[name];
            if(copy&&((copyIsArr=copy instanceof Array)||(copy instanceof Object))){  //如果copy存在并且是数组或者对象
                if(copyIsArr){   //如果copy是数组
                    src = (src&&src instanceof Array)?src:[];  //判断target中是否有相同属性名的属性,并且该属性为数组。
                    target[name] = deepCopy(src,copy);
                }else{
                    src = src?src:{};
                    target[name] = deepCopy(src,copy);
                }
            }
            else {
                target[name] = copy;
            }
        }
    }
    return target;
}