import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SpendingsPage } from "./SpendingsPage";

jest.useFakeTimers().setSystemTime(new Date("2023-12-27"));

const mockUseSpendings = jest.fn(() => ({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
}));

jest.mock("../../services/spendings.ts", () => {
  return {
    __esModule: true,
    useSpendings: (c, o) => mockUseSpendings(c, o),
  };
});

jest.mock("react-query", () => {
  const originalModule = jest.requireActual("react-query");

  return {
    __esModule: true,
    ...originalModule,
    useQueryClient: jest.fn(() => ({ invalidateQueries: () => null })),
    useMutation: jest.fn(() => ({
      mutateAsync: jest.fn(),
      isLoading: false,
      isError: false,
      isSuccess: false,
    })),
  };
});

/*
jest.mock("../../stores/spendingsStore.ts", () => {
  return {
    __esModule: true,
    selectedCurrency: "USD",
    setSelectedCurrency: jest.fn(),
    selectedOrder: "amount",
    setSelectedOrder: jest.fn(),
  };
});*/

describe("SpendingsPage", () => {
  test("if the spendings list is empty, it should show the right copy", () => {
    render(<SpendingsPage />);
    expect(screen.getByText("There is no data to show.")).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  test("if an error occured when fetching the data, it should show an error message", () => {
    mockUseSpendings.mockImplementation(() => ({
      data: [],
      isLoading: false,
      isError: true,
      isSuccess: false,
    }));
    render(<SpendingsPage />);

    expect(
      screen.getByText(
        "There was an error while loading the results. Please, try again later."
      )
    ).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  test("if the spendings list is loading, it should show a loader", () => {
    mockUseSpendings.mockImplementation(() => ({
      data: [],
      isLoading: true,
      isError: false,
      isSuccess: false,
    }));
    render(<SpendingsPage />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("if there are items in the spendings list, should show the Spendings table", () => {
    mockUseSpendings.mockImplementation(() => ({
      data: [
        {
          description: "orange",
          amount: 3.0,
          currency: "HUF",
          spent_at: "2023-12-16T10:31:05.734000Z",
        },
        {
          description: "apple",
          amount: 300.0,
          currency: "HUF",
          spent_at: "2023-12-16T10:32:34.150000Z",
        },
      ],
      isLoading: false,
      isError: false,
      isSuccess: true,
    }));
    render(<SpendingsPage />);

    expect(screen.getAllByRole("row")).toHaveLength(2);
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});
