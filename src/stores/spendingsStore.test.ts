/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { SpendingsStore } from "./spendingsStore";

const mockPushState = jest.fn();
global.history.pushState = jest.fn((a, b, c) => mockPushState(a, b, c));

describe("SpendingsStore", () => {
  const location = {
    ...window.location,
    search: "",
    pathname: "http://localhost:5173/",
  };
  Object.defineProperty(window, "location", {
    writable: true,
    value: location,
  });

  const spendingsStore = new SpendingsStore();

  describe("initStore", () => {
    test("should run when setting up the store and not call handleParamChange initially", () => {
      expect(mockPushState).not.toHaveBeenCalled();
      expect(spendingsStore.selectedCurrency).toBe(null);
      expect(spendingsStore.initialised).toBeTruthy();
    });

    test("should run when setting up the store and should set the filters based on the URL params", () => {
      const location = {
        ...window.location,
        search: "?currency=USD",
        pathname: "http://localhost:5173/",
      };
      Object.defineProperty(window, "location", {
        writable: true,
        value: location,
      });

      const spendingStoreWithUrlParam = new SpendingsStore();

      expect(mockPushState).not.toHaveBeenCalled();
      expect(spendingStoreWithUrlParam.selectedCurrency).toBe("USD");
      expect(spendingStoreWithUrlParam.initialised).toBeTruthy();
    });
  });

  describe("setSelectedCurrency", () => {
    test("should set the selected currency and set it in the URL as URL param", () => {
      expect(spendingsStore.selectedCurrency).toBe(null);
      spendingsStore.setSelectedCurrency("HUF");
      expect(spendingsStore.selectedCurrency).toBe("HUF");
      expect(mockPushState).toHaveBeenCalledWith(
        {},
        "",
        "http://localhost:5173/?currency=HUF"
      );
    });
  });

  describe("setSelectedOrder", () => {
    test("should set the selected order and set it in the URL as URL param", () => {
      expect(spendingsStore.selectedOrder).toBe(null);
      spendingsStore.setSelectedOrder("amount");
      expect(spendingsStore.selectedOrder).toBe("amount");
      expect(mockPushState).toHaveBeenCalledWith(
        {},
        "",
        "http://localhost:5173/?currency=HUF&order=amount"
      );
    });
  });

  describe("handleParamChange", () => {
    test("should set new URL parameters when the selected order or filter changes", () => {
      spendingsStore.handleParamChange("HUF", "-amount");
      expect(mockPushState).toHaveBeenCalledWith(
        {},
        "",
        "http://localhost:5173/?currency=HUF&order=-amount"
      );
    });
  });
});
