
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