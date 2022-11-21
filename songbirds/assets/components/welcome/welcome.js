export default function createWelcomeBlock(language) {
    const countLayer = 20;
    const WORDS = {
        en: "Play",
        ru: "Играть",
    }

    const welcome = document.createElement('section');
    welcome.className = 'welcome';
    welcome.id = 'welcome-page';

    const stage = document.createElement('div');
    stage.className = 'stage';

    for (let i = 0; i < countLayer; i++) {
        const layer = document.createElement('div');
        layer.className = 'layer';
        layer.id = "layer-main";
        stage.append(layer)
    }

    const welcomeButton = document.createElement('button');
    welcomeButton.className = 'welcome__button next__question next__question-active';
    welcomeButton.innerHTML = WORDS[language];

    welcome.append(stage, welcomeButton);

    return welcome
}
