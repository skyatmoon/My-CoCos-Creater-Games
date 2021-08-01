"use strict";
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