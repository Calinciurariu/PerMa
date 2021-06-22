function main(){
    let giftOptions = document.getElementsByName('gift');
    let happyOptions = document.getElementsByName('happy');
    let habbitOptions = document.getElementsByName('habbit');
    let rangeOptions = document.getElementsByName('range');

    let parfumeOptions = {
        '00':'60ce554f0a884a4324cce6e0',
        '01':'60ce55783d635340b8d4fb0f',
        '02':'60ce55783d635340b8d4fb0f',  
        '03':'60ce6482a129c9496ce5462b',

        '10':'60ce554f0a884a4324cce6e0',
        '11':'60ce554f0a884a4324cce6e0', 
        '12':'60ce5640afac8d4b944d2e30',
        '13':'60cf48735600b13a844221e8',

        '20':'60ce5766de9c621d90a1af57',  
        '21':'60ce5766de9c621d90a1af57',
        '22':'60ce5766de9c621d90a1af57',
        '23':'60ce5766de9c621d90a1af57', 
        
    }
    
    document.getElementById('send').addEventListener('click',()=>{
        let arr = [5,5];
        // for(let i=0;i<giftOptions.length;i++){
        //     if(giftOptions[i].checked){
        //         arr[0] = i;
        //     }
        // }
        for(let i=0;i<happyOptions.length;i++){
            if(happyOptions[i].checked){
                arr[0] = i;
            }
        }
        // for(let i=0;i<habbitOptions.length;i++){
        //     if(habbitOptions[i].checked){
        //         arr[2] = i;
        //     }
        // }
        for(let i=0;i<rangeOptions.length;i++){
            if(rangeOptions[i].checked){
                arr[1] = i;
            }
        }
        let key = arr.join('');
        console.log(key);
        if(parfumeOptions[key] === undefined){
            console.log('perfume');
            window.location.href = '.././notFound.html';

        }else{

            localStorage.setItem('quizPerfume',parfumeOptions[key]);

            window.location.href = '.././singleProduct.html';

        }
    });
}

main();