import BtfxConsts from "../BtfxConsts";
import {timeFrameToMS} from "./BtfxUtils";

describe('timeFrameToMS', () => {
    it('should return 15 * 60 for m15 Const', () => {
        expect(timeFrameToMS(BtfxConsts.timeFrame.m15)).toBe(15 * 60 * 1000);
    });
});
