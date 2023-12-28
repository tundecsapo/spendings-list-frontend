import axios from "axios";
import { useQuery } from "react-query";
import { Currency, OrderType, Spending } from "../types";

const baseUrl =
  "https://shielded-depths-43687-bb049deacd16.herokuapp.com/spendings";

export const getSpendings = async (
  currency?: Currency | null,
  order?: OrderType | null
) => {
  const params = {
    ...(currency && { currency }),
    ...(order && { order }),
  };

  const { data } = await axios.get<Spending[]>(baseUrl, { params });
  return data;
};

export function useSpendings(
  currency?: Currency | null,
  order?: OrderType | null
) {
  return useQuery(
    ["spendings", currency, order],
    () => getSpendings(currency, order),
    {
      staleTime: Infinity,
    }
  );
}

export const createSpending = async (spending: Spending) => {
  const { data } = await axios.post(baseUrl, spending);
  return data;
};
