(function(){
    let reviewList = document.querySelectorAll('.review__item');
    let wrapper = document.getElementById('body__wrapper');
    let mainWrapper = document.getElementById('mainWrapper');
    let currentPopUpElement;
    let cross;


    for (let i = 0; i< reviewList.length; i++){
        reviewList[i].addEventListener('click', e=> {
            e.stopPropagation();
            popUpActive(reviewList[i]);
    })
    }




    function popUpActive(item){
        currentPopUpElement = item.cloneNode(true);
        currentPopUpElement.append(createCross());
        currentPopUpElement.classList.toggle('review__item-popup')
        mainWrapper.append(currentPopUpElement);
        wrapper.classList.toggle('body__wrapper-active');
        document.addEventListener('click', closePopUp);
    }

    


    function closePopUp(event){
        let item = event.target;
        let its_item = (item == currentPopUpElement||
                        isDescendant(currentPopUpElement, item));
            
        if(!its_item || item.parentNode == cross) {
            wrapper.classList.toggle('body__wrapper-active');
            mainWrapper.lastElementChild.remove();
            currentPopUpElement = null;
            document.removeEventListener('click', closePopUp)
            cross = null;
        }

        
    }

    function isDescendant(parent, child) {
        var node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
   }

   function createCross() {
    let crossWrapper = document.createElement('div');
    crossWrapper.classList.add('review__cross')

    let crossItemFirst = document.createElement('div')
    crossItemFirst.classList.add('cross__item')

    let crossItemTwo = document.createElement('div')
    crossItemTwo.classList.add('cross__item')

    crossWrapper.append(crossItemFirst);
    crossWrapper.append(crossItemTwo);
    cross = crossWrapper;
    return crossWrapper;
   }


}())