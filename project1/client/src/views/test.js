var arr = Array.from(str)

function quanpailie(arr){
    var arr1 = arr.slice(0)
    for(var i=0;i<arr1.length;i++){
        var diyiyuansu = arr1.splice(i,1)
        if(arr1.length!=0){
            return [diyiyuansu,quanpailie(arr1)] 
        }else{return diyiyuansu}

    }
}
    
console.log(quanpailie([a,b,c]))