// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AudioSourceControl, { SoundType } from "./AudioSourceControl";

const {ccclass, property} = cc._decorator;

export enum GameStatus{
    Game_Ready = 0,
    Game_Playing,
    Game_Over
}

@ccclass
export default class MainControl extends cc.Component {
    @property(cc.Sprite)
    spBg: cc.Sprite [] = [null, null];
    @property(cc.Prefab)
    pipePrefab: cc.Prefab = null;
    @property(cc.Label)
    labelScore: cc.Label = null;
    // @property(AudioSourceControl)
    // audioSourceControl: AudioSourceControl = null;
    // record score
    gameScore: number = 0;

    pipe: cc.Node[] = [null, null, null]

    spGameOver: cc.Sprite = null;

    btnStart: cc.Button = null;

    gameStatus: GameStatus = GameStatus.Game_Ready;


    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        // open Collision System
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        // open debug draw when you debug the game
        // do not forget to close when you ship the game
        collisionManager.enabledDebugDraw = false;
        // find the GameOver node, and set active property to false
        this.spGameOver = this.node.getChildByName("GameOver").getComponent(cc.Sprite);
        this.spGameOver.node.active = false;
        // this.spGameOver = this.node.getChildByName("GameOver").getComponent(cc.Sprite);
        // this.spGameOver.node.active = false;

        this.btnStart = this.node.getChildByName("BtnStart").getComponent(cc.Button);
        this.btnStart.node.on(cc.Node.EventType.TOUCH_END,this.touchStartBtn, this);
    }
    
    gameOver () {
        this.spGameOver.node.active = true;
        this.btnStart.node.active = true;
        this.gameStatus = GameStatus.Game_Over;
        // this.audioSourceControl.playSound(SoundType.E_Sound_Die);
    }

    touchStartBtn () {
        this.btnStart.node.active = false;

        this.gameStatus = GameStatus.Game_Playing;

        this.spGameOver.node.active = false;

        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i].x = 170 + 200 * i;
            var minY = 0;
            var maxY = 240;
            this.pipe[i].y = minY + Math.random() * (maxY - minY);
        }

        var bird = this.node.getChildByName("Bird");
        bird.y = 0;
        bird.rotation = 0;

        this.gameScore = 0;
        this.labelScore.string = this.gameScore.toString();

    }

    start () {
        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i] = cc.instantiate(this.pipePrefab);
            this.node.getChildByName("Pipe").addChild(this.pipe[i]);
    
            this.pipe[i].x = 170 + 200 * i;
            var minY = -128;
            var maxY = 128;
            var t = 1;
            var ran = Math.random();
            if (ran >=0.5){
                t = -1
            }

            this.pipe[i].y = t * minY + ran * (maxY - minY);
        }
    }

    

    update (dt: number) {
        if (this.gameStatus != GameStatus.Game_Playing){
            return;
        }
        // move the background node
        for (let i = 0; i < this.spBg.length; i++) {
                this.spBg[i].node.x -= 1.0;
            if (this.spBg[i].node.x <= -288) {
                this.spBg[i].node.x = 288;
            }
        }

        // move pipes
        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i].x -= 1.0;
            if (this.pipe[i].x <= -170) {
                this.pipe[i].x = 430;

                var minY = -128;
                var maxY = 128;
                var t = 1;
                var ran = Math.random();
                if (ran >=0.5){
                    t = -1
                }

                this.pipe[i].y = t * minY + ran * (maxY - minY);
            }
        }


    }



}