import BtfxConsts from "../BtfxConsts";
import {timeFrameToMS} from "./BtfxUtils";

describe('timeFrameToMS', () => {
    it('should return 15 * 60 for m15 Const', () => {
        expect(timeFrameToMS(BtfxConsts.timeFrame.m15)).toBe(15 * 60 * 1000);
    });
    it('should return 3 * 60 * 60 for h3 Const', () => {
        expect(timeFrameToMS(BtfxConsts.timeFrame.h3)).toBe(3 * 60 * 60 * 1000);
    });
});
