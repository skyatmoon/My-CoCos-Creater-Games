"use strict";
cc._RF.push(module, 'e766dudQidKQa6g1yNcEso5', 'Maincontrol');
// Script/Maincontrol.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var MainControl = /** @class */ (function (_super) {
    __extends(MainControl, _super);
    function MainControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spBg = [null, null];
        _this.pipePrefab = null;
        _this.labelScore = null;
        // @property(AudioSourceControl)
        // audioSourceControl: AudioSourceControl = null;
        // record score
        _this.gameScore = 0;
        _this.pipe = [null, null, null];
        _this.spGameOver = null;
        _this.btnStart = null;
        _this.gameStatus = GameStatus.Game_Ready;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    MainControl.prototype.onLoad = function () {
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
        this.btnStart.node.on(cc.Node.EventType.TOUCH_END, this.touchStartBtn, this);
    };
    MainControl.prototype.gameOver = function () {
        this.spGameOver.node.active = true;
        this.btnStart.node.active = true;
        this.gameStatus = GameStatus.Game_Over;
        // this.audioSourceControl.playSound(SoundType.E_Sound_Die);
    };
    MainControl.prototype.touchStartBtn = function () {
        this.btnStart.node.active = false;
        this.gameStatus = GameStatus.Game_Playing;
        this.spGameOver.node.active = false;
        for (var i = 0; i < this.pipe.length; i++) {
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
    };
    MainControl.prototype.start = function () {
        for (var i = 0; i < this.pipe.length; i++) {
            this.pipe[i] = cc.instantiate(this.pipePrefab);
            this.node.getChildByName("Pipe").addChild(this.pipe[i]);
            this.pipe[i].x = 170 + 200 * i;
            var minY = -128;
            var maxY = 128;
            var t = 1;
            var ran = Math.random();
            if (ran >= 0.5) {
                t = -1;
            }
            this.pipe[i].y = t * minY + ran * (maxY - minY);
        }
    };
    MainControl.prototype.update = function (dt) {
        if (this.gameStatus != GameStatus.Game_Playing) {
            return;
        }
        // move the background node
        for (var i = 0; i < this.spBg.length; i++) {
            this.spBg[i].node.x -= 1.0;
            if (this.spBg[i].node.x <= -288) {
                this.spBg[i].node.x = 288;
            }
        }
        // move pipes
        for (var i = 0; i < this.pipe.length; i++) {
            this.pipe[i].x -= 1.0;
            if (this.pipe[i].x <= -170) {
                this.pipe[i].x = 430;
                var minY = -128;
                var maxY = 128;
                var t = 1;
                var ran = Math.random();
                if (ran >= 0.5) {
                    t = -1;
                }
                this.pipe[i].y = t * minY + ran * (maxY - minY);
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], MainControl.prototype, "spBg", void 0);
    __decorate([
        property(cc.Prefab)
    ], MainControl.prototype, "pipePrefab", void 0);
    __decorate([
        property(cc.Label)
    ], MainControl.prototype, "labelScore", void 0);
    MainControl = __decorate([
        ccclass
    ], MainControl);
    return MainControl;
}(cc.Component));
exports.default = MainControl;

cc._RF.pop();