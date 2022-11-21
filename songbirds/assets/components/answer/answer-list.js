const COUNT_ANSWERS = 6;
import birdsData from "../../data/birdsData";
import birdsDataEn from "../../data/birdsDataEn";

function createAnswerList(step, lang) {

    const birdsDataAll = {
        en: birdsDataEn,
        ru: birdsData
    }

    const answer = document.createElement('section');
    answer.className = "answer";

    const answerInner = document.createElement('div');
    answerInner.className = "answer__inner";

    const answerList = document.createElement('ul');
    answerList.className = "answer__list";

    for (let i = 0; i < COUNT_ANSWERS; i++) {
        let answerItem = document.createElement('li');
        answerItem.className = "answer__item";

        let answerItemText = document.createElement('span');
        answerItemText.className = 'answer__item__text';
        answerItemText.innerHTML = birdsDataAll[lang][step][i].name;
        answerItem.append(answerItemText);
        answerList.append(answerItem);
    }
    answerInner.append(answerList);
    answer.append(answerInner);

    return answer;
}

export default createAnswerList;
