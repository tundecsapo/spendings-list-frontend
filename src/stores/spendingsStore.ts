import { createContext } from "react";
import { action, autorun, makeObservable, observable } from "mobx";
import { Currency, OrderType } from "../types";

export class SpendingsStore {
  initialised: boolean = false;
  selectedCurrency: Currency | null = null;
  selectedOrder: OrderType | null = null;

  constructor() {
    makeObservable<SpendingsStore>(this, {
      initialised: observable,
      selectedCurrency: observable,
      selectedOrder: observable,
      setSelectedCurrency: action,
      setSelectedOrder: action,
      initStore: action,
    });

    this.initStore();
  }

  setSelectedCurrency(currency: Currency | null) {
    this.selectedCurrency = currency;
  }

  setSelectedOrder(selectedOrder: OrderType | null) {
    this.selectedOrder = selectedOrder;
  }

  initStore() {
    autorun(() => {
      if (
        this.initialised &&
        (urlParams.get("currency") !== this.selectedCurrency ||
          urlParams.get("order") !== this.selectedOrder)
      )
        this.handleParamChange(this.selectedCurrency, this.selectedOrder);
    });

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("currency")) {
      this.setSelectedCurrency(
        (urlParams.get("currency") as Currency) ?? undefined
      );
    }
    if (urlParams.get("order")) {
      this.setSelectedOrder((urlParams.get("order") as OrderType) ?? undefined);
    }

    this.initialised = true;
  }

  handleParamChange(c: Currency | null, o: OrderType | null) {
    const paramStart = c || o ? "?" : "";
    const currencyParam = c ? `currency=${c}` : "";
    const secondParamStart = c && o ? "&" : "";
    const selectedOrderParam = o ? `order=${o}` : "";

    const allParams = `${paramStart}${currencyParam}${secondParamStart}${selectedOrderParam}`;

    history.pushState({}, "", `${window.location.pathname}${allParams}`);
  }
}

export const SpendingsStoreContext = createContext(new SpendingsStore());
