import renderer from "react-test-renderer";
import { SpendingsTable } from "./SpendingsTable";

it("SpendingsTable renders correctly", () => {
  const tree = renderer
    .create(
      <SpendingsTable
        tableData={[
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
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
