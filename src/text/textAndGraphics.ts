import { Application, Container, Sprite, Text, TextStyle } from "pixi.js";
import * as PIXI from "pixi.js";

export class TextAndGraphics {
    private textContainer: Container;
    private app: Application;

    private style = new TextStyle({
        fontFamily: "Arial",
        fontStyle: "italic",
        fontWeight: "bold",
        stroke: { color: "#4a1850", width: 5, join: "round" },
        dropShadow: {
            color: "#000000",
            blur: 2,
            angle: Math.PI / 6,
            distance: 3,
        },
        wordWrap: true,
        wordWrapWidth: 440,
    });

    constructor(app: Application) {
        this.app = app;
        this.textContainer = new Container();
        this.textContainer.y = app.screen.height / 2;
        app.stage.addChild(this.textContainer);
    }

    public renderText(markup: string) {
        console.log("rendertext: ", markup);
        this.textContainer.removeChildren();
        this.style.fontSize = 30 + Math.random() * 45;
        const components: string[] = markup.split(":");
        let nextX = 0;
        for (let i = 0; i < components.length; i++) {
            if (components[i].substring(0, 1) == "<") {
                const newSprite: Sprite = this.createEmojiComponent(components[i], this.style.fontSize);
                newSprite.x = nextX;
                this.textContainer.addChild(newSprite);
                nextX += newSprite.width;
            } else {
                const newText: Text = this.createTextComponent(components[i]);
                newText.x = nextX;
                this.textContainer.addChild(newText);
                nextX += newText.bounds.width;
            }
        }
        this.textContainer.x = this.app.screen.width / 2 - this.textContainer.width / 2;
    }

    private createTextComponent(text: string): Text {
        return new Text({ text: text, style: this.style });
    }

    private createEmojiComponent(text: string, height: number): Sprite {
        const newSprite: Sprite = PIXI.Sprite.from(text.substring(1, text.length - 1));
        const ratio: number = height / newSprite.height;
        newSprite.height = height;
        newSprite.width *= ratio;
        return newSprite;
    }
}
