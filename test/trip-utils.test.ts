import { expect } from "chai";
import { describe, it } from "mocha";
import { calculateNights, formatShortDate } from "../src/utils/trips.js";

describe("formatShortDate", () => {
  it("returns empty string for undefined", () => {
    expect(formatShortDate(undefined)).to.equal("");
  });

  it("returns empty string for empty string", () => {
    expect(formatShortDate("")).to.equal("");
  });

  it("returns empty string for invalid date", () => {
    expect(formatShortDate("not-a-date")).to.equal("");
  });

  it("returns a non-empty string for a valid date", () => {
    const result = formatShortDate("2026-06-15");
    expect(result).to.be.a("string").and.not.equal("");
  });
});

describe("calculateNights", () => {
  it("returns 0 for empty strings", () => {
    expect(calculateNights("", "")).to.equal(0);
  });

  it("returns 0 for undefined inputs", () => {
    expect(calculateNights(undefined, undefined)).to.equal(0);
  });

  it("returns correct night count", () => {
    expect(calculateNights("2026-06-15", "2026-06-20")).to.equal(5);
  });

  it("returns 0 when end is before start", () => {
    expect(calculateNights("2026-06-20", "2026-06-15")).to.equal(0);
  });
});
