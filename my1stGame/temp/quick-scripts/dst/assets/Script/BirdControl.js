
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCaXJkQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU00sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLHVEQUFjLENBQUE7SUFDZCwyREFBWSxDQUFBO0lBQ1oscURBQVMsQ0FBQTtBQUNiLENBQUMsRUFKVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUlyQjtBQUVEO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBeUdDO1FBdkdHLGVBQWU7UUFDZixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLG1DQUFtQztRQUNuQyxpQkFBVyxHQUFnQixJQUFJLENBQUM7UUFFaEMsUUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLFFBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7SUFnR3hCLENBQUM7SUE3RkcsNEJBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWMsS0FBMEI7UUFDcEMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBQztZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztT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LElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBckdnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBeUcvQjtJQUFELGtCQUFDO0NBekdELEFBeUdDLENBekd3QyxFQUFFLENBQUMsU0FBUyxHQXlHcEQ7a0JBekdvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5pbXBvcnQgeyBTb3VuZFR5cGUgfSBmcm9tIFwiLi9BdWRpb1NvdXJjZUNvbnRyb2xcIjtcclxuaW1wb3J0IE1haW5Db250cm9sIGZyb20gXCIuL01haW5jb250cm9sXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBlbnVtIEdhbWVTdGF0dXN7XHJcbiAgICBHYW1lX1JlYWR5ID0gMCxcclxuICAgIEdhbWVfUGxheWluZyxcclxuICAgIEdhbWVfT3ZlclxyXG59XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpcmRDb250cm9sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvL1NwZWVkIG9mIGJpcmRcclxuICAgIHNwZWVkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8vIGFzc2lnbiBvZiBtYWluIENvbnRyb2wgY29tcG9uZW50XHJcbiAgICBtYWluQ29udHJvbDogTWFpbkNvbnRyb2wgPSBudWxsO1xyXG5cclxuICAgIGMxID0gY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICBjMiA9IGNjLkNvbG9yLldISVRFO1xyXG5cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5tYWluQ29udHJvbCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmdldENvbXBvbmVudChcIk1haW5jb250cm9sXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hTdGFydCAoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBpZiAoZXZlbnQuZ2V0TG9jYXRpb24oKS55ID49IDI1Nil7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IC0zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWFpbkNvbnRyb2wuZ2FtZVNjb3JlLS07XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWFpbkNvbnRyb2wubGFiZWxTY29yZS5zdHJpbmcgPSB0aGlzLm1haW5Db250cm9sLmdhbWVTY29yZS50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMuc3BlZWQgPSAxO1xyXG4gICAgICAgIC8vIHRoaXMubWFpbkNvbnRyb2wuYXVkaW9Tb3VyY2VDb250cm9sLnBsYXlTb3VuZChTb3VuZFR5cGUuRV9Tb3VuZF9GbHkpO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLm1haW5Db250cm9sLmdhbWVTY29yZSA9PT0gLTUwKSB7XHJcbiAgICAgICAgLy8gICAgIGNjLmxvZyhcImdhbWUgb3ZlclwiKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5tYWluQ29udHJvbC5nYW1lT3ZlcigpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNwZWVkID0gMDtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaXNpb25FbnRlciAob3RoZXI6IGNjLkNvbGxpZGVyLCBzZWxmOiBjYy5Db2xsaWRlcikge1xyXG4gICAgICAgIC8vIC8vIGdhbWUgb3ZlclxyXG4gICAgICAgIC8vIGNjLmxvZyhcImdhbWUgb3ZlclwiKTtcclxuICAgICAgICAvLyB0aGlzLm1haW5Db250cm9sLmdhbWVPdmVyKCk7XHJcbiAgICAgICAgLy8gY29sbGlkZXIgdGFnIGlzIDAsIHRoYXQgbWVhbnMgdGhlIGJpcmQgaGF2ZSBhIGNvbGxpc2lvbiB3aXRoIHBpcGUsIHRoZW4gZ2FtZSBvdmVyXHJcbiAgICAgICAgaWYgKG90aGVyLnRhZyA9PT0gMCkge1xyXG4gICAgICAgICAgICBjYy5sb2coXCJnYW1lIG92ZXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRyb2wuZ2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbGxpZGVyIHRhZyBpcyAxLCB0aGF0IG1lYW5zIHRoZSBiaXJkIGNyb3NzIGEgcGlwZSwgdGhlbiBhZGQgc2NvcmVcclxuICAgICAgICBlbHNlIGlmIChvdGhlci50YWcgPT09IDEpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRyb2wuZ2FtZVNjb3JlICs9IDI7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRyb2wubGFiZWxTY29yZS5zdHJpbmcgPSB0aGlzLm1haW5Db250cm9sLmdhbWVTY29yZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm1haW5Db250cm9sLmF1ZGlvU291cmNlQ29udHJvbC5wbGF5U291bmQoU291bmRUeXBlLkVfU291bmRfU2NvcmUpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSB0aGlzLmMxO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob3RoZXIudGFnID09PSAyKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250cm9sLmdhbWVTY29yZSArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250cm9sLmxhYmVsU2NvcmUuc3RyaW5nID0gdGhpcy5tYWluQ29udHJvbC5nYW1lU2NvcmUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5tYWluQ29udHJvbC5hdWRpb1NvdXJjZUNvbnRyb2wucGxheVNvdW5kKFNvdW5kVHlwZS5FX1NvdW5kX1Njb3JlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNvbG9yID0gdGhpcy5jMjtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1haW5Db250cm9sLmdhbWVTdGF0dXMgIT0gR2FtZVN0YXR1cy5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub2RlLnBvc2l0aW9uLnkgPiAwKXtcclxuICAgICAgICB0aGlzLnNwZWVkIC09IDAuMDU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5ub2RlLnBvc2l0aW9uLnkgPCAwKXtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZCArPSAwLjA1O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZDsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUueSAtPSAoMC4wMDUgKiB0aGlzLm5vZGUueSk7XHJcblxyXG4gICAgICAgIHZhciBhbmdsZSA9IC0odGhpcy5zcGVlZC8yKSAqIDMwO1xyXG4gICAgICAgIGlmIChhbmdsZSA+PSAzMCkge1xyXG4gICAgICAgICAgICBhbmdsZSA9IDMwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gPSBhbmdsZTtcclxuXHJcbiAgICAgICAgLy8gd2hlbiBiaXJkIGlzIG91dCBvZiBzY3JlZW4sIHRoZW4gZ2FtZSBvdmVyXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS55ID49IDI1NiB8fCB0aGlzLm5vZGUueSA8PSAtMjU2KSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRyb2wuZ2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxufSJdfQ==