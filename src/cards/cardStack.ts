import { Point, Sprite } from "pixi.js";
import { gsap } from "gsap";

export class CardStack {
    private cards: Sprite[] = [];
    private cardsOffset: number = 0.5;
    private _position: Point = new Point();

    constructor(cards: Sprite[]) {
        this.cards = cards;
        this.setupCards();
    }

    private setupCards() {
        for (let i: number = 0; i < this.cards.length; i++) {
            this.cards[i].position = new Point(
                this._position.x + this.cardsOffset * i,
                this._position.y + this.cardsOffset * i,
            );
        }
    }

    public set position(position: Point) {
        this._position = position;
        this.setupCards();
    }

    public recieveCard(card: Sprite, transitionTimeInSec: number) {
        card.zIndex = this.cards.length;
        const posOffset = this.cards.length * this.cardsOffset;
        this.cards.push(card);
        gsap.to(card, {
            pixi: { x: this._position.x + posOffset, y: this._position.y + posOffset },
            duration: transitionTimeInSec,
        });
    }

    public getTopCard(): Sprite {
        const topCard = this.cards[this.cards.length - 1];
        this.cards.pop();
        return topCard;
    }

    public isEmpty(): boolean {
        return this.cards.length == 0;
    }
}
