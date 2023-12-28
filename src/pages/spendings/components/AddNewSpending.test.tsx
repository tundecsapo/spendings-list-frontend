import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddNewSpending } from "./AddNewSpending";

jest.useFakeTimers().setSystemTime(new Date("2023-12-28"));

const mockMutate = jest.fn();

jest.mock("react-query", () => {
  const originalModule = jest.requireActual("react-query");

  return {
    __esModule: true,
    ...originalModule,
    useQueryClient: jest.fn(() => ({ invalidateQueries: () => null })),
    useMutation: jest.fn(() => ({
      mutateAsync: (p) => mockMutate(p),
      isLoading: false,
      isError: false,
      isSuccess: false,
    })),
  };
});

describe("AddNewSpending", () => {
  describe("clicking on Save", () => {
    test("should show error messages and not fire API call when information missing", () => {
      render(<AddNewSpending />);
      const button = screen.getByRole("button", { name: "Save" });
      fireEvent.click(button);

      expect(
        screen.getByText("Please, provide a description!")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please, provide an amount!")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please, provide a currency!")
      ).toBeInTheDocument();
      expect(mockMutate).not.toHaveBeenCalled();
    });

    test("should not show error messages and should fire API call when all information provided", () => {
      render(<AddNewSpending />);
      const descriptionField = screen.getByTestId("description");
      const amountField = screen.getByTestId("amount");
      const currencyField = screen.getByTestId("currency");

      const button = screen.getByText("Save");

      fireEvent.change(descriptionField, { target: { value: "Test Desc" } });
      fireEvent.change(amountField, { target: { value: "123" } });
      fireEvent.change(currencyField, { target: { value: "USD" } });

      fireEvent.click(button);

      expect(
        screen.queryByText("Please, provide a description!")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Please, provide am amount!")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Please, provide a currency!")
      ).not.toBeInTheDocument();
      expect(mockMutate).toHaveBeenCalledWith({
        amount: 123,
        currency: "USD",
        description: "Test Desc",
        spent_at: new Date().toISOString(),
      });
    });
  });
});
