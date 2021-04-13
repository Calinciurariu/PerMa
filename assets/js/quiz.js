function displayRadioValue() {
    var giftValidation = document.getElementsByName('gift');
    var happyValidation = document.getElementsByName('happy');
    var habitValidation = document.getElementsByName('habit');
    var rangeValidation = document.getElementsByName('range');

    
        if(giftValidation[0].checked&&happyValidation[0].checked&&habitValidation[0].checked&&rangeValidation[0].checked)
        { document.getElementById("send").disabled="disabled";

       }
    
}