export default function createResultsBlock(score, lang) {

    let isWon = (Number(score) === 30)?"max":"low"; 
    let playAgain = (Number(score) === 30)?true:false;

    const language = lang;
    const resultsTextLanguage = {
                            title: {
                                    max: {
                                        en: "Congratulations! You are won!",
                                        ru: "Поздравляем! Вы выйграли!"
                                        },
                                    low: {
                                        en: "Game over!",
                                        ru: "Игра окончена!"
                                        },
                                    }, 
                            text: {
                                    en: "Out of 30 possible points, you scored: ",
                                    ru: "Из 30 возможных баллов вы набрали: ",
                                    },

                            button: {
                                    en: "Play again",
                                    ru: "Играть снова",
                                    }
                        }

    const results = document.createElement('section');
    results.className = 'results';
    results.id = 'results-block'

    const resultsTitle = document.createElement('h2');
    resultsTitle.className = "results__title";
    resultsTitle.innerHTML = resultsTextLanguage.title[isWon][language];

    const resultsText = document.createElement('p');
    resultsText.className = 'results__text';
    resultsText.innerHTML = resultsTextLanguage.text[language] + String(score);

    const resultsButton = document.createElement('button');
    resultsButton.className = `play__again__button next__question button`;
    if(!playAgain) {
        resultsButton.classList.add('next__question-active');
    }

    resultsButton.innerHTML = resultsTextLanguage.button[language];

    results.append(resultsTitle, resultsText, resultsButton);


    return results;
}