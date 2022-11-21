export default function setLanguage() {

    if(localStorage.getItem('lang')) {
        return;
    } else {
        localStorage.setItem('lang', 'ru');
    }
   
}