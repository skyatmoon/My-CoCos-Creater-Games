
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/AudioSourceControl');
require('./assets/Script/BirdControl');
require('./assets/Script/Maincontrol');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Maincontrol.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNYWluY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLHVEQUFjLENBQUE7SUFDZCwyREFBWSxDQUFBO0lBQ1oscURBQVMsQ0FBQTtBQUNiLENBQUMsRUFKVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUlyQjtBQUdEO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBNEhDO1FBMUhHLFVBQUksR0FBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbEMsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFFN0IsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFDNUIsZ0NBQWdDO1FBQ2hDLGlEQUFpRDtRQUNqRCxlQUFlO1FBQ2YsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixVQUFJLEdBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXBDLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRTdCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFFM0IsZ0JBQVUsR0FBZSxVQUFVLENBQUMsVUFBVSxDQUFDOztJQTBHbkQsQ0FBQztJQXZHRyx3QkFBd0I7SUFDeEIsNEJBQU0sR0FBTjtRQUNJLHdCQUF3QjtRQUN4QixJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6RCxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLDBDQUEw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LEVBQUUsRUFBRTtZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDdEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUVyQixJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDaEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDVixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3hCLElBQUksR0FBRyxJQUFHLEdBQUcsRUFBQztvQkFDVixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7aUJBQ1Q7Z0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDbkQ7U0FDSjtJQUdMLENBQUM7SUF0SEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDYztJQUVsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNTO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ1M7SUFOWCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBNEgvQjtJQUFELGtCQUFDO0NBNUhELEFBNEhDLENBNUh3QyxFQUFFLENBQUMsU0FBUyxHQTRIcEQ7a0JBNUhvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEF1ZGlvU291cmNlQ29udHJvbCwgeyBTb3VuZFR5cGUgfSBmcm9tIFwiLi9BdWRpb1NvdXJjZUNvbnRyb2xcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGVudW0gR2FtZVN0YXR1c3tcclxuICAgIEdhbWVfUmVhZHkgPSAwLFxyXG4gICAgR2FtZV9QbGF5aW5nLFxyXG4gICAgR2FtZV9PdmVyXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5Db250cm9sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBzcEJnOiBjYy5TcHJpdGUgW10gPSBbbnVsbCwgbnVsbF07XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcGlwZVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmVsU2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8vIEBwcm9wZXJ0eShBdWRpb1NvdXJjZUNvbnRyb2wpXHJcbiAgICAvLyBhdWRpb1NvdXJjZUNvbnRyb2w6IEF1ZGlvU291cmNlQ29udHJvbCA9IG51bGw7XHJcbiAgICAvLyByZWNvcmQgc2NvcmVcclxuICAgIGdhbWVTY29yZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwaXBlOiBjYy5Ob2RlW10gPSBbbnVsbCwgbnVsbCwgbnVsbF1cclxuXHJcbiAgICBzcEdhbWVPdmVyOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIGJ0blN0YXJ0OiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIGdhbWVTdGF0dXM6IEdhbWVTdGF0dXMgPSBHYW1lU3RhdHVzLkdhbWVfUmVhZHk7XHJcblxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIG9wZW4gQ29sbGlzaW9uIFN5c3RlbVxyXG4gICAgICAgIHZhciBjb2xsaXNpb25NYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIGNvbGxpc2lvbk1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgLy8gb3BlbiBkZWJ1ZyBkcmF3IHdoZW4geW91IGRlYnVnIHRoZSBnYW1lXHJcbiAgICAgICAgLy8gZG8gbm90IGZvcmdldCB0byBjbG9zZSB3aGVuIHlvdSBzaGlwIHRoZSBnYW1lXHJcbiAgICAgICAgY29sbGlzaW9uTWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gZmFsc2U7XHJcbiAgICAgICAgLy8gZmluZCB0aGUgR2FtZU92ZXIgbm9kZSwgYW5kIHNldCBhY3RpdmUgcHJvcGVydHkgdG8gZmFsc2VcclxuICAgICAgICB0aGlzLnNwR2FtZU92ZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lT3ZlclwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnNwR2FtZU92ZXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLnNwR2FtZU92ZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lT3ZlclwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAvLyB0aGlzLnNwR2FtZU92ZXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5idG5TdGFydCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJ0blN0YXJ0XCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIHRoaXMuYnRuU3RhcnQubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy50b3VjaFN0YXJ0QnRuLCB0aGlzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2FtZU92ZXIgKCkge1xyXG4gICAgICAgIHRoaXMuc3BHYW1lT3Zlci5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5idG5TdGFydC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdHVzID0gR2FtZVN0YXR1cy5HYW1lX092ZXI7XHJcbiAgICAgICAgLy8gdGhpcy5hdWRpb1NvdXJjZUNvbnRyb2wucGxheVNvdW5kKFNvdW5kVHlwZS5FX1NvdW5kX0RpZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG91Y2hTdGFydEJ0biAoKSB7XHJcbiAgICAgICAgdGhpcy5idG5TdGFydC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWVTdGF0dXMgPSBHYW1lU3RhdHVzLkdhbWVfUGxheWluZztcclxuXHJcbiAgICAgICAgdGhpcy5zcEdhbWVPdmVyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waXBlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlwZVtpXS54ID0gMTcwICsgMjAwICogaTtcclxuICAgICAgICAgICAgdmFyIG1pblkgPSAwO1xyXG4gICAgICAgICAgICB2YXIgbWF4WSA9IDI0MDtcclxuICAgICAgICAgICAgdGhpcy5waXBlW2ldLnkgPSBtaW5ZICsgTWF0aC5yYW5kb20oKSAqIChtYXhZIC0gbWluWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYmlyZCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJpcmRcIik7XHJcbiAgICAgICAgYmlyZC55ID0gMDtcclxuICAgICAgICBiaXJkLnJvdGF0aW9uID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lU2NvcmUgPSAwO1xyXG4gICAgICAgIHRoaXMubGFiZWxTY29yZS5zdHJpbmcgPSB0aGlzLmdhbWVTY29yZS50b1N0cmluZygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpcGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5waXBlW2ldID0gY2MuaW5zdGFudGlhdGUodGhpcy5waXBlUHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUGlwZVwiKS5hZGRDaGlsZCh0aGlzLnBpcGVbaV0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMucGlwZVtpXS54ID0gMTcwICsgMjAwICogaTtcclxuICAgICAgICAgICAgdmFyIG1pblkgPSAtMTI4O1xyXG4gICAgICAgICAgICB2YXIgbWF4WSA9IDEyODtcclxuICAgICAgICAgICAgdmFyIHQgPSAxO1xyXG4gICAgICAgICAgICB2YXIgcmFuID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgaWYgKHJhbiA+PTAuNSl7XHJcbiAgICAgICAgICAgICAgICB0ID0gLTFcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5waXBlW2ldLnkgPSB0ICogbWluWSArIHJhbiAqIChtYXhZIC0gbWluWSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHVwZGF0ZSAoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVTdGF0dXMgIT0gR2FtZVN0YXR1cy5HYW1lX1BsYXlpbmcpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG1vdmUgdGhlIGJhY2tncm91bmQgbm9kZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcEJnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwQmdbaV0ubm9kZS54IC09IDEuMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3BCZ1tpXS5ub2RlLnggPD0gLTI4OCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcEJnW2ldLm5vZGUueCA9IDI4ODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbW92ZSBwaXBlc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waXBlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlwZVtpXS54IC09IDEuMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGlwZVtpXS54IDw9IC0xNzApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlwZVtpXS54ID0gNDMwO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtaW5ZID0gLTEyODtcclxuICAgICAgICAgICAgICAgIHZhciBtYXhZID0gMTI4O1xyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSAxO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbiA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFuID49MC41KXtcclxuICAgICAgICAgICAgICAgICAgICB0ID0gLTFcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpcGVbaV0ueSA9IHQgKiBtaW5ZICsgcmFuICogKG1heFkgLSBtaW5ZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/BirdControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCaXJkQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU00sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLHVEQUFjLENBQUE7SUFDZCwyREFBWSxDQUFBO0lBQ1oscURBQVMsQ0FBQTtBQUNiLENBQUMsRUFKVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUlyQjtBQUVEO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBeUdDO1FBdkdHLGVBQWU7UUFDZixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLG1DQUFtQztRQUNuQyxpQkFBVyxHQUFnQixJQUFJLENBQUM7UUFFaEMsUUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLFFBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7SUFnR3hCLENBQUM7SUE3RkcsNEJBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWMsS0FBMEI7UUFDcEMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBQztZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNkO2FBQ0Q7WUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2Y7UUFDRCxnQ0FBZ0M7UUFDaEMsOEVBQThFO1FBQ2xGLGtCQUFrQjtRQUNsQix3RUFBd0U7UUFDeEUsNENBQTRDO1FBQzVDLDJCQUEyQjtRQUMzQixtQ0FBbUM7UUFDbkMsc0JBQXNCO1FBQ3RCLElBQUk7SUFDUixDQUFDO0lBRUQsc0NBQWdCLEdBQWhCLFVBQWtCLEtBQWtCLEVBQUUsSUFBaUI7UUFDbkQsZUFBZTtRQUNmLHVCQUF1QjtRQUN2QiwrQkFBK0I7UUFDL0Isb0ZBQW9GO1FBQ3BGLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDakIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO1FBQ0Qsc0VBQXNFO2FBQ2pFLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFFdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzRSwwRUFBMEU7WUFDMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUc3QjthQUNJLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFFdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzRSwwRUFBMEU7WUFDMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUU3QjtJQUNMLENBQUM7SUFJRCwyQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBUSxFQUFVO1FBRWQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsWUFBWSxFQUFFO1lBQ3hELE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQztZQUM3QixJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3pCO2FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDN0I7YUFDSTtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDN0I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqQyxJQUFJLEtBQUssSUFBSSxFQUFFLEVBQUU7WUFDYixLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFM0IsNkNBQTZDO1FBQzdDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBckdnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBeUcvQjtJQUFELGtCQUFDO0NBekdELEFBeUdDLENBekd3QyxFQUFFLENBQUMsU0FBUyxHQXlHcEQ7a0JBekdvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgeyBTb3VuZFR5cGUgfSBmcm9tIFwiLi9BdWRpb1NvdXJjZUNvbnRyb2xcIjtcclxuaW1wb3J0IE1haW5Db250cm9sIGZyb20gXCIuL01haW5jb250cm9sXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBlbnVtIEdhbWVTdGF0dXN7XHJcbiAgICBHYW1lX1JlYWR5ID0gMCxcclxuICAgIEdhbWVfUGxheWluZyxcclxuICAgIEdhbWVfT3ZlclxyXG59XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpcmRDb250cm9sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvL1NwZWVkIG9mIGJpcmRcclxuICAgIHNwZWVkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8vIGFzc2lnbiBvZiBtYWluIENvbnRyb2wgY29tcG9uZW50XHJcbiAgICBtYWluQ29udHJvbDogTWFpbkNvbnRyb2wgPSBudWxsO1xyXG5cclxuICAgIGMxID0gY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICBjMiA9IGNjLkNvbG9yLldISVRFO1xyXG5cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5tYWluQ29udHJvbCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmdldENvbXBvbmVudChcIk1haW5jb250cm9sXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hTdGFydCAoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBpZiAoZXZlbnQuZ2V0TG9jYXRpb24oKS55ID49IDI1Nil7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IC0zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWFpbkNvbnRyb2wuZ2FtZVNjb3JlLS07XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWFpbkNvbnRyb2wubGFiZWxTY29yZS5zdHJpbmcgPSB0aGlzLm1haW5Db250cm9sLmdhbWVTY29yZS50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMuc3BlZWQgPSAxO1xyXG4gICAgICAgIC8vIHRoaXMubWFpbkNvbnRyb2wuYXVkaW9Tb3VyY2VDb250cm9sLnBsYXlTb3VuZChTb3VuZFR5cGUuRV9Tb3VuZF9GbHkpO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLm1haW5Db250cm9sLmdhbWVTY29yZSA9PT0gLTUwKSB7XHJcbiAgICAgICAgLy8gICAgIGNjLmxvZyhcImdhbWUgb3ZlclwiKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5tYWluQ29udHJvbC5nYW1lT3ZlcigpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNwZWVkID0gMDtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaXNpb25FbnRlciAob3RoZXI6IGNjLkNvbGxpZGVyLCBzZWxmOiBjYy5Db2xsaWRlcikge1xyXG4gICAgICAgIC8vIC8vIGdhbWUgb3ZlclxyXG4gICAgICAgIC8vIGNjLmxvZyhcImdhbWUgb3ZlclwiKTtcclxuICAgICAgICAvLyB0aGlzLm1haW5Db250cm9sLmdhbWVPdmVyKCk7XHJcbiAgICAgICAgLy8gY29sbGlkZXIgdGFnIGlzIDAsIHRoYXQgbWVhbnMgdGhlIGJpcmQgaGF2ZSBhIGNvbGxpc2lvbiB3aXRoIHBpcGUsIHRoZW4gZ2FtZSBvdmVyXHJcbiAgICAgICAgaWYgKG90aGVyLnRhZyA9PT0gMCkge1xyXG4gICAgICAgICAgICBjYy5sb2coXCJnYW1lIG92ZXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRyb2wuZ2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbGxpZGVyIHRhZyBpcyAxLCB0aGF0IG1lYW5zIHRoZSBiaXJkIGNyb3NzIGEgcGlwZSwgdGhlbiBhZGQgc2NvcmVcclxuICAgICAgICBlbHNlIGlmIChvdGhlci50YWcgPT09IDEpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRyb2wuZ2FtZVNjb3JlICs9IDI7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRyb2wubGFiZWxTY29yZS5zdHJpbmcgPSB0aGlzLm1haW5Db250cm9sLmdhbWVTY29yZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm1haW5Db250cm9sLmF1ZGlvU291cmNlQ29udHJvbC5wbGF5U291bmQoU291bmRUeXBlLkVfU291bmRfU2NvcmUpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSB0aGlzLmMxO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob3RoZXIudGFnID09PSAyKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250cm9sLmdhbWVTY29yZSArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250cm9sLmxhYmVsU2NvcmUuc3RyaW5nID0gdGhpcy5tYWluQ29udHJvbC5nYW1lU2NvcmUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5tYWluQ29udHJvbC5hdWRpb1NvdXJjZUNvbnRyb2wucGxheVNvdW5kKFNvdW5kVHlwZS5FX1NvdW5kX1Njb3JlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNvbG9yID0gdGhpcy5jMjtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1haW5Db250cm9sLmdhbWVTdGF0dXMgIT0gR2FtZVN0YXR1cy5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub2RlLnBvc2l0aW9uLnkgPiAwKXtcclxuICAgICAgICB0aGlzLnNwZWVkIC09IDAuMDU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5ub2RlLnBvc2l0aW9uLnkgPCAwKXtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZCArPSAwLjA1O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUueSAtPSAoMC4wMDUgKiB0aGlzLm5vZGUueSk7XHJcblxyXG4gICAgICAgIHZhciBhbmdsZSA9IC0odGhpcy5zcGVlZC8yKSAqIDMwO1xyXG4gICAgICAgIGlmIChhbmdsZSA+PSAzMCkge1xyXG4gICAgICAgICAgICBhbmdsZSA9IDMwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gPSBhbmdsZTtcclxuXHJcbiAgICAgICAgLy8gd2hlbiBiaXJkIGlzIG91dCBvZiBzY3JlZW4sIHRoZW4gZ2FtZSBvdmVyXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS55ID49IDI1NiB8fCB0aGlzLm5vZGUueSA8PSAtMjU2KSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRyb2wuZ2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/AudioSourceControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c71ddrYVOJEJJCd8JZidUWQ', 'AudioSourceControl');
// Script/AudioSourceControl.ts

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
exports.SoundType = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// sound type enum
var SoundType;
(function (SoundType) {
    SoundType[SoundType["E_Sound_Fly"] = 0] = "E_Sound_Fly";
    SoundType[SoundType["E_Sound_Score"] = 1] = "E_Sound_Score";
    SoundType[SoundType["E_Sound_Die"] = 2] = "E_Sound_Die";
})(SoundType = exports.SoundType || (exports.SoundType = {}));
var AudioSourceControl = /** @class */ (function (_super) {
    __extends(AudioSourceControl, _super);
    function AudioSourceControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backgroundMusic = null;
        // sound effect when bird flying
        _this.flySound = null;
        _this.scoreSound = null;
        _this.dieSound = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    AudioSourceControl.prototype.start = function () {
        // play background music
        cc.audioEngine.playMusic(this.backgroundMusic, true);
    };
    AudioSourceControl.prototype.playSound = function (type) {
        if (type == SoundType.E_Sound_Fly) {
            cc.audioEngine.playEffect(this.flySound, false);
        }
        else if (type == SoundType.E_Sound_Score) {
            cc.audioEngine.playEffect(this.scoreSound, false);
        }
        else if (type == SoundType.E_Sound_Die) {
            cc.audioEngine.playEffect(this.dieSound, false);
        }
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], AudioSourceControl.prototype, "backgroundMusic", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], AudioSourceControl.prototype, "flySound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], AudioSourceControl.prototype, "scoreSound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], AudioSourceControl.prototype, "dieSound", void 0);
    AudioSourceControl = __decorate([
        ccclass
    ], AudioSourceControl);
    return AudioSourceControl;
}(cc.Component));
exports.default = AudioSourceControl;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxBdWRpb1NvdXJjZUNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDLGtCQUFrQjtBQUNsQixJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDakIsdURBQWUsQ0FBQTtJQUNmLDJEQUFhLENBQUE7SUFDYix1REFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUpXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBSXBCO0FBR0Q7SUFBZ0Qsc0NBQVk7SUFBNUQ7UUFBQSxxRUFxQ0M7UUFsQ0cscUJBQWUsR0FBaUIsSUFBSSxDQUFDO1FBRXJDLGdDQUFnQztRQUVoQyxjQUFRLEdBQWlCLElBQUksQ0FBQztRQUc5QixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFHaEMsY0FBUSxHQUFpQixJQUFJLENBQUM7O1FBdUI5QixpQkFBaUI7SUFDckIsQ0FBQztJQXRCRyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLGtDQUFLLEdBQUw7UUFDSSx3QkFBd0I7UUFDeEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsc0NBQVMsR0FBVCxVQUFXLElBQWU7UUFDdEIsSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUMvQixFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25EO2FBQ0ksSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLGFBQWEsRUFBRTtZQUN0QyxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JEO2FBQ0ksSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUNwQyxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQS9CRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUM7K0RBQ087SUFJckM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLFNBQVMsRUFBQyxDQUFDO3dEQUNBO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsQ0FBQzswREFDRTtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUM7d0RBQ0E7SUFiYixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQXFDdEM7SUFBRCx5QkFBQztDQXJDRCxBQXFDQyxDQXJDK0MsRUFBRSxDQUFDLFNBQVMsR0FxQzNEO2tCQXJDb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vLyBzb3VuZCB0eXBlIGVudW1cclxuZXhwb3J0IGVudW0gU291bmRUeXBlIHtcclxuICAgIEVfU291bmRfRmx5ID0gMCxcclxuICAgIEVfU291bmRfU2NvcmUsXHJcbiAgICBFX1NvdW5kX0RpZVxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb1NvdXJjZUNvbnRyb2wgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5BdWRpb0NsaXB9KVxyXG4gICAgYmFja2dyb3VuZE11c2ljOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICAgIC8vIHNvdW5kIGVmZmVjdCB3aGVuIGJpcmQgZmx5aW5nXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuQXVkaW9DbGlwfSlcclxuICAgIGZseVNvdW5kOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5BdWRpb0NsaXB9KVxyXG4gICAgc2NvcmVTb3VuZDogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuQXVkaW9DbGlwfSlcclxuICAgIGRpZVNvdW5kOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICAvLyBwbGF5IGJhY2tncm91bmQgbXVzaWNcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5iYWNrZ3JvdW5kTXVzaWMsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlTb3VuZCAodHlwZTogU291bmRUeXBlKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gU291bmRUeXBlLkVfU291bmRfRmx5KSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5mbHlTb3VuZCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFNvdW5kVHlwZS5FX1NvdW5kX1Njb3JlKSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5zY29yZVNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gU291bmRUeXBlLkVfU291bmRfRGllKSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5kaWVTb3VuZCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59Il19
//------QC-SOURCE-SPLIT------
