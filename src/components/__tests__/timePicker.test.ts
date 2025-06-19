import { describe, it, expect } from "vitest";
import { getUpdatedTimeValue } from "../common/utils/timePicker";
import { TimePickerMode } from "../../utils/projectTypes";

describe("The getUpdatedTimeValue function", () => {
    it("should return '2025-01-01T02:00:00.000Z' result for parameters: 2025-01-01T00:00:00.000Z, 2, and hours mode", () => {
        const result = getUpdatedTimeValue("2025-01-01T00:00:00.000Z", 2, TimePickerMode.HOURS);

        expect(result).toBe("2025-01-01T02:00:00.000Z");
    });

    it("should return '2025-01-01T14:00:00.000Z' result for parameters: 2025-01-01T00:00:00.000Z, 14, and hours mode", () => {
        const result = getUpdatedTimeValue("2025-01-01T00:00:00.000Z", 14, TimePickerMode.HOURS);

        expect(result).toBe("2025-01-01T14:00:00.000Z");
    });

    it("should return '2025-01-01T00:08:00.000Z' result for parameters: 2025-01-01T00:00:00.000Z, 8, and minutes mode", () => {
        const result = getUpdatedTimeValue("2025-01-01T00:00:00.000Z", 8, TimePickerMode.MINUTES);

        expect(result).toBe("2025-01-01T00:08:00.000Z");
    });

    it("should return '2025-01-01T00:55:00.000Z' result for parameters: 2025-01-01T00:00:00.000Z, 55, and minutes mode", () => {
        const result = getUpdatedTimeValue("2025-01-01T00:00:00.000Z", 55, TimePickerMode.MINUTES);

        expect(result).toBe("2025-01-01T00:55:00.000Z");
    });

    it("should set date object hours to 2 for parameters: 2025-01-01 00:00:00.000(date object), 2, and hours mode", () => {
        const result = getUpdatedTimeValue(new Date("2025-01-01T00:00:00.000Z"), 2, TimePickerMode.HOURS);

        expect(result).toBeInstanceOf(Date);
        expect(result.getHours()).toBe(2);
    });

    it("should set date object minutes to 55 for parameters: 2025-01-01 00:00:00.000(date object), 55, and minutes mode", () => {
        const result = getUpdatedTimeValue(new Date("2025-01-01T00:00:00.000Z"), 55, TimePickerMode.MINUTES);

        expect(result).toBeInstanceOf(Date);
        expect(result.getMinutes()).toBe(55);
    });
});
