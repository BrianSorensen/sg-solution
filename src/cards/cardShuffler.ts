import { Sprite } from "pixi.js";
import { CardStack } from "./cardStack";
import * as PIXI from "pixi.js";

export class CardShuffler {
    private cardStack1: CardStack;
    private cardStack2: CardStack;

    private shuffleIntervalInSec: number = 1;
    private cardTransitionInSec: number = 2;
    private numberOfCards = 144;

    private shuffleTimer: ReturnType<typeof setTimeout>;

    constructor() {
        this.shuffleTimer = setInterval(() => this.moveCard(), this.shuffleIntervalInSec * 1000);
    }

    public init(app: PIXI.Application) {
        const cards1: Sprite[] = this.createCards(this.numberOfCards, app);
        const cards2: Sprite[] = new Array<Sprite>();
        this.cardStack1 = new CardStack(cards1);
        this.cardStack2 = new CardStack(cards2);
        this.cardStack1.position = new PIXI.Point(app.screen.width / 2 - 150, app.screen.height / 2 - 100);
        this.cardStack2.position = new PIXI.Point(app.screen.width / 2 + 150, app.screen.height / 2 - 100);
    }

    private moveCard() {
        this.cardStack2.recieveCard(this.cardStack1.getTopCard(), this.cardTransitionInSec);
        if (this.cardStack1.isEmpty()) {
            clearInterval(this.shuffleTimer);
        }
    }

    private createCards(numberOfCards: number, app: PIXI.Application) {
        const cards: Sprite[] = new Array<Sprite>();
        for (let i: number = 0; i < numberOfCards; i++) {
            const card = PIXI.Sprite.from("assets/card.png");
            card.tint = Math.random() * 0xffffff;
            cards.push(card);
            app.stage.addChild(card);
        }
        return cards;
    }
}
