import renderer from "react-test-renderer";
import { Navigation } from "./Navigation";

it("Navigation renders correctly", () => {
  const tree = renderer
    .create(
      <Navigation>
        <p>children</p>
      </Navigation>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
