
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