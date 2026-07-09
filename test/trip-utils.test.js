"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const trips_js_1 = require("../src/utils/trips.js");
(0, mocha_1.describe)("formatShortDate", () => {
    (0, mocha_1.it)("returns empty string for undefined", () => {
        (0, chai_1.expect)((0, trips_js_1.formatShortDate)(undefined)).to.equal("");
    });
    (0, mocha_1.it)("returns empty string for empty string", () => {
        (0, chai_1.expect)((0, trips_js_1.formatShortDate)("")).to.equal("");
    });
    (0, mocha_1.it)("returns empty string for invalid date", () => {
        (0, chai_1.expect)((0, trips_js_1.formatShortDate)("not-a-date")).to.equal("");
    });
    (0, mocha_1.it)("returns a non-empty string for a valid date", () => {
        const result = (0, trips_js_1.formatShortDate)("2026-06-15");
        (0, chai_1.expect)(result).to.be.a("string").and.not.equal("");
    });
});
(0, mocha_1.describe)("calculateNights", () => {
    (0, mocha_1.it)("returns 0 for empty strings", () => {
        (0, chai_1.expect)((0, trips_js_1.calculateNights)("", "")).to.equal(0);
    });
    (0, mocha_1.it)("returns 0 for undefined inputs", () => {
        (0, chai_1.expect)((0, trips_js_1.calculateNights)(undefined, undefined)).to.equal(0);
    });
    (0, mocha_1.it)("returns correct night count", () => {
        (0, chai_1.expect)((0, trips_js_1.calculateNights)("2026-06-15", "2026-06-20")).to.equal(5);
    });
    (0, mocha_1.it)("returns 0 when end is before start", () => {
        (0, chai_1.expect)((0, trips_js_1.calculateNights)("2026-06-20", "2026-06-15")).to.equal(0);
    });
});
