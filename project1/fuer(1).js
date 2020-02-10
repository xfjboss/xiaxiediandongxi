
function fuer(par){
var b = [];
var a = par
    while(a!==1){
        var c= Math.abs((a%(-2)))
        b.push(c);
        var yushu = (a/(-2))%1
        if((a/(-2)) >= 0 && yushu === 0){//zheng数且为整数
            a = parseInt(a/(-2))
        }
        if((a/(-2)) < 0 && yushu === 0){//fu数且为整数
            a = parseInt(a/(-2))
        }
        if((a/(-2)) >= 0 && yushu !== 0){//整数但不是整数
            a = parseInt(a/(-2))+1;
        }
        if((a/(-2)) < 0 && yushu !== 0){//负数但不是整数
            a = parseInt(a/(-2))-1;
        }
    }
    b.push(1);
    b = b.reverse();
    return b
}
console.log(fuer(3))
