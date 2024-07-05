import { TextAndGraphics } from "./textAndGraphics";

export class TextSpawner {
    private shuffleIntervalInSec: number = 2;
    private components: string[] = [
        "Summer",
        "Happy",
        "Iceceam",
        "Water",
        "Vacation",
        "Fun",
        "<assets/baby_emoji.png>",
        "<assets/blush_emoji.png>",
        "<assets/awe_emoji.png>",
        "<assets/cat_emoji.png>",
    ];

    private textAndGraphics: TextAndGraphics;

    public init(app) {
        this.textAndGraphics = new TextAndGraphics(app);
        this.newLine();
        setInterval(() => this.newLine(), this.shuffleIntervalInSec * 1000);
    }

    private newLine() {
        this.textAndGraphics.renderText(this.createString());
    }

    private createString(): string {
        let line: string = "";
        for (let i = 0; i < 4; i++) {
            line += this.components[Math.floor(Math.random() * this.components.length)];
            line += ":";
        }
        return line;
    }
}
