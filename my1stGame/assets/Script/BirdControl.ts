// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { SoundType } from "./AudioSourceControl";
import MainControl from "./Maincontrol";

const {ccclass, property} = cc._decorator;

export enum GameStatus{
    Game_Ready = 0,
    Game_Playing,
    Game_Over
}
@ccclass
export default class BirdControl extends cc.Component {

    //Speed of bird
    speed: number = 0;

    // assign of main Control component
    mainControl: MainControl = null;

    c1 = cc.Color.BLACK;
    c2 = cc.Color.WHITE;


    onLoad () {
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.mainControl = cc.Canvas.instance.node.getComponent("Maincontrol");
    }

    onTouchStart (event: cc.Event.EventTouch) {
        if (event.getLocation().y >= 256){
            this.speed = 3;
            }
        else{
            this.speed = -3;
            }
            // this.mainControl.gameScore--;
            // this.mainControl.labelScore.string = this.mainControl.gameScore.toString();
        // this.speed = 1;
        // this.mainControl.audioSourceControl.playSound(SoundType.E_Sound_Fly);
        // if (this.mainControl.gameScore === -50) {
        //     cc.log("game over");
        //     this.mainControl.gameOver();
        //     this.speed = 0;
        // }
    }

    onCollisionEnter (other: cc.Collider, self: cc.Collider) {
        // // game over
        // cc.log("game over");
        // this.mainControl.gameOver();
        // collider tag is 0, that means the bird have a collision with pipe, then game over
        if (other.tag === 0) {
            cc.log("game over");
            this.mainControl.gameOver();
            this.speed = 0;
        }
        // collider tag is 1, that means the bird cross a pipe, then add score
        else if (other.tag === 1) {

            this.mainControl.gameScore += 2;
            this.mainControl.labelScore.string = this.mainControl.gameScore.toString();
            // this.mainControl.audioSourceControl.playSound(SoundType.E_Sound_Score);
            this.node.color = this.c1;
        

        }
        else if (other.tag === 2) {

            this.mainControl.gameScore += 1;
            this.mainControl.labelScore.string = this.mainControl.gameScore.toString();
            // this.mainControl.audioSourceControl.playSound(SoundType.E_Sound_Score);
            this.node.color = this.c2;

        }
    }

    

    start () {

    }

    update (dt: number) {

        if (this.mainControl.gameStatus != GameStatus.Game_Playing) {
            return;
        }
        if (this.node.position.y > 0){
        this.speed -= 0.05;
        this.node.y += this.speed;
        }
        else if (this.node.position.y < 0){
            this.speed += 0.05;
            this.node.y += this.speed;
        }
        else {
            this.node.y += this.speed; 
        }

        this.node.y -= (0.005 * this.node.y);

        var angle = -(this.speed/2) * 30;
        if (angle >= 30) {
            angle = 30;
        }
        this.node.rotation = angle;

        // when bird is out of screen, then game over
        if (this.node.y >= 256 || this.node.y <= -256) {
            this.mainControl.gameOver();
            this.speed = 0;
        }
    }

    

}