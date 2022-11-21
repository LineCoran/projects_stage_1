import createAnswerList from "../answer/answer-list";

export default function createGameQuestion(step, lang) {
    const WORDS = {
        en: "Next question",
        ru: "Следующий вопрос"
    }
    const game = document.createElement('section');
    game.className = 'game';
    game.id = 'game';

    const question = document.createElement('div');
    question.className = 'question';

    const nextQuestionButton = document.createElement('button');
    nextQuestionButton.className = 'next__question';
    nextQuestionButton.innerHTML = WORDS[lang];

    question.append(createAnswerList(step, lang));
    game.append(question, nextQuestionButton);

    return game;
}