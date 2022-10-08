(function(){
    const range = document.getElementById('range');
    const slider = document.getElementById('review_slider');
    let currentPosition = 0;
    let currentValue = range.value;
    console.log(currentValue)
    range.addEventListener('change', function(){
        let nextValue = range.value;
        moveSlider(nextValue-currentValue);
        currentValue = nextValue;
    })
    
    function moveSlider(num) {
        currentPosition -= num*(parseFloat(getComputedStyle(slider.firstElementChild).width)+parseFloat(getComputedStyle(slider).columnGap));
        slider.style.transform = `translateX(${currentPosition}px)`;
    }
}())