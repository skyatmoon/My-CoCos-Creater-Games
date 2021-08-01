"use strict";
cc._RF.push(module, '8d187xEp+BF2IlZ86hCERac', 'BirdControl');
// Script/BirdControl.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStatus = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["Game_Ready"] = 0] = "Game_Ready";
    GameStatus[GameStatus["Game_Playing"] = 1] = "Game_Playing";
    GameStatus[GameStatus["Game_Over"] = 2] = "Game_Over";
})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));
var BirdControl = /** @class */ (function (_super) {
    __extends(BirdControl, _super);
    function BirdControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Speed of bird
        _this.speed = 0;
        // assign of main Control component
        _this.mainControl = null;
        _this.c1 = cc.Color.BLACK;
        _this.c2 = cc.Color.WHITE;
        return _this;
    }
    BirdControl.prototype.onLoad = function () {
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.mainControl = cc.Canvas.instance.node.getComponent("Maincontrol");
    };
    BirdControl.prototype.onTouchStart = function (event) {
        if (event.getLocation().y >= 256) {
            this.speed = 3;
        }
        else {
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
    };
    BirdControl.prototype.onCollisionEnter = function (other, self) {
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
    };
    BirdControl.prototype.start = function () {
    };
    BirdControl.prototype.update = function (dt) {
        if (this.mainControl.gameStatus != GameStatus.Game_Playing) {
            return;
        }
        if (this.node.position.y > 0) {
            this.speed -= 0.05;
            this.node.y += this.speed;
        }
        else if (this.node.position.y < 0) {
            this.speed += 0.05;
            this.node.y += this.speed;
        }
        else {
            this.node.y += this.speed;
        }
        this.node.y -= (0.005 * this.node.y);
        var angle = -(this.speed / 2) * 30;
        if (angle >= 30) {
            angle = 30;
        }
        this.node.rotation = angle;
        // when bird is out of screen, then game over
        if (this.node.y >= 256 || this.node.y <= -256) {
            this.mainControl.gameOver();
            this.speed = 0;
        }
    };
    BirdControl = __decorate([
        ccclass
    ], BirdControl);
    return BirdControl;
}(cc.Component));
exports.default = BirdControl;

cc._RF.pop();