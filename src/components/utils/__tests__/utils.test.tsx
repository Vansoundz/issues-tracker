import { render } from "@testing-library/react";
import Modal from "../Modal";

it("renders without error", async () => {
  const modal = render(
    <Modal open={true} close={() => {}}>
      <div>elem</div>
    </Modal>
  );

  const el = await modal.findByText("elem");
  expect(el).toBeTruthy();
});
