import axios from "axios";

test("Deve gerar as faturas pela api", async () => {
  const input = {
    month: 1,
    year: 2024,
    type: "cash",
  };

  const res = await axios.post(
    "http://localhost:3000/generate-invoices",
    input
  );

  const output = res.data;

  expect(output.at(0)?.date).toBe("2024-01-05T13:00:00.000Z");
  expect(output.at(0)?.amount).toEqual(6000);
});
