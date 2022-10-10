const inputMoney = document.getElementById('inputMoney');
const labelsList = document.querySelectorAll('.feed__label__item')
const labelsNumber = document.querySelectorAll('.feed__label__item-label');

inputMoney.value = 100;
checkNumber();



for (let i =0; i < labelsNumber.length; i++){
    labelsNumber[i].addEventListener('click', (item) => {
        inputMoney.value =  item
                                .target
                                .closest('label')
                                .getAttribute("for");
    })
}



function checkNumber() {
    for (let i = 0; i < labelsList.length; i++) {
        console.log(labelsList[i].getAttribute('id') === inputMoney.value)
        labelsList[i].checked = (labelsList[i].getAttribute('id') === inputMoney.value)?true:false;
    }
}


inputMoney.addEventListener('change', checkNumber);
