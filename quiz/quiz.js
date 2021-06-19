function main(){
    let giftOptions = document.getElementsByName('gift');
    let happyOptions = document.getElementsByName('happy');
    let habbitOptions = document.getElementsByName('habbit');
    let rangeOptions = document.getElementsByName('range');

    let parfumeOptions = {
        '1021':'dior1',
        '2201':'dior2',
        '2210':'dior3',
        '1302':'dior4',
        '2002':'dior5',
        '2010':'dior6',
        '2301':'dior7',
        '2212':'dior8'
    }
    
    document.getElementById('send').addEventListener('click',()=>{
        let arr = [0,0,0,0];
        for(let i=0;i<giftOptions.length;i++){
            if(giftOptions[i].checked){
                arr[0] = i;
            }
        }
        for(let i=0;i<happyOptions.length;i++){
            if(happyOptions[i].checked){
                arr[1] = i;
            }
        }
        for(let i=0;i<habbitOptions.length;i++){
            if(habbitOptions[i].checked){
                arr[2] = i;
            }
        }
        for(let i=0;i<rangeOptions.length;i++){
            if(rangeOptions[i].checked){
                arr[3] = i;
            }
        }
        let key = arr.join('');
        if(parfumeOptions[key] === undefined){
            console.log('perfume');
        }else{
            console.log(parfumeOptions[key]);
        }
    });
}

main();