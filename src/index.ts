import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { CardShuffler } from "./cards/cardShuffler";
import { TextSpawner } from "./text/textSpawner";

const app = new PIXI.Application();
app.init({ background: "#102060", resizeTo: window });

window.onload = async (): Promise<void> => {
    await PIXI.Assets.load("assets/card.png");
    await PIXI.Assets.load([
        "assets/baby_emoji.png",
        "assets/blush_emoji.png",
        "assets/awe_emoji.png",
        "assets/cat_emoji.png",
    ]);
    document.body.appendChild(app.canvas);
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
    //   resizeCanvas();
    app.stage.interactive = false;
    init();
};

let buttonCards: PIXI.Graphics = new PIXI.Graphics();
let buttonText: PIXI.Graphics = new PIXI.Graphics();

function init() {
    buttonCards = new PIXI.Graphics().rect(app.screen.width / 3, 200, app.screen.width / 3, 100).fill({ color: 0x0 });
    buttonCards.eventMode = "static";
    buttonCards.cursor = "pointer";
    buttonCards.addListener("pointerdown", () => {
        startCards();
    });
    app.stage.addChild(buttonCards);
    buttonText = new PIXI.Graphics().rect(app.screen.width / 3, 400, app.screen.width / 3, 100).fill({ color: 0x0 });
    buttonText.eventMode = "static";
    buttonText.cursor = "pointer";
    buttonText.addListener("pointerdown", () => {
        startText();
    });
    app.stage.addChild(buttonText);

    const fill = new PIXI.FillGradient(0, 0, 0, 36 * 1.7);

    const colors = [0xffffff, 0x00ff99].map((color) => PIXI.Color.shared.setValue(color).toNumber());

    colors.forEach((number, index) => {
        const ratio = index / colors.length;

        fill.addColorStop(ratio, number);
    });

    const style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 36,
        fontStyle: "italic",
        fontWeight: "bold",
        fill: { fill },
        stroke: { color: 0x4a1850, width: 5 },
        dropShadow: {
            color: 0x000000,
            angle: Math.PI / 6,
            blur: 4,
            distance: 6,
        },
        wordWrap: true,
        wordWrapWidth: 440,
    });

    const cardsText = new PIXI.Text("Cards", style);
    cardsText.x = app.screen.width / 3 + buttonCards.width / 2 - cardsText.width / 2;
    cardsText.y = 220;

    buttonCards.addChild(cardsText);

    const textText = new PIXI.Text("Text", style);
    textText.x = app.screen.width / 3 + buttonText.width / 2 - textText.width / 2;
    textText.y = 420;
    buttonText.addChild(textText);
}

function startCards() {
    buttonCards.destroy();
    buttonText.destroy();
    const cardShuffler: CardShuffler = new CardShuffler();
    cardShuffler.init(app);
}

function startText() {
    buttonCards.destroy();
    buttonText.destroy();
    const textSpawner: TextSpawner = new TextSpawner();
    textSpawner.init(app);
}
