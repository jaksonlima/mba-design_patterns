import ContractDatabaseReponsitory from "../src/infra/db/ContractDatabaseReponsitory";
import ContractReponsitory from "../src/domain/ContractRepository";
import CsvPresenter from "../src/infra/presenter/CsvPresenter";
import DatabaseConnection from "../src/infra/db/DatabaseConnection";
import GenerateInvoicesUseCase from "../src/application/usecase/GenerateInvoicesUseCase";
import JsonPresenter from "../src/infra/presenter/JsonPresenter";
import PgPromiseAdapter from "../src/infra/db/PgPromiseAdapter";

// integration test

let generateInvoicesUseCase: GenerateInvoicesUseCase;
let repository: ContractReponsitory;
let connection: DatabaseConnection;

beforeEach(() => {
  connection = new PgPromiseAdapter();
  repository = new ContractDatabaseReponsitory(connection);

  const jsonPresenter = new JsonPresenter();
  generateInvoicesUseCase = new GenerateInvoicesUseCase(
    repository,
    jsonPresenter
  );
});

afterEach(() => {
  connection.close();
});

test("Deve gerar as notas ficais por regime de caixa", async () => {
  const input = {
    month: 1,
    year: 2024,
    type: "cash",
  };

  const output = await generateInvoicesUseCase.execute(input);

  expect(output.at(0)?.date).toEqual(new Date("2024-01-05T13:00:00.000Z"));
  expect(output.at(0)?.amount).toBe(6000);
});

test("Deve gerar as notas fiscais por regime de competência por csv", async () => {
  const input = {
    month: 1,
    year: 2024,
    type: "accrual",
  };

  const generateInvoicesUseCase = new GenerateInvoicesUseCase(
    repository,
    new CsvPresenter()
  );
  const output = await generateInvoicesUseCase.execute(input);
  expect(output).toBe("2024-01-01;500");
});

test("Deve gerar as notas ficais por regime de competência mês 1", async () => {
  const input = {
    month: 1,
    year: 2024,
    type: "accrual",
  };

  const output = await generateInvoicesUseCase.execute(input);

  expect(output.at(0)?.date).toEqual(new Date("2024-01-01T13:00:00.000Z"));
  expect(output.at(0)?.amount).toBe(500);
});

test("Deve gerar as notas ficais por regime de competência mês 2", async () => {
  const input = {
    month: 2,
    year: 2024,
    type: "accrual",
  };

  const output = await generateInvoicesUseCase.execute(input);

  expect(output.at(0)?.date).toEqual(new Date("2024-02-01T13:00:00.000Z"));
  expect(output.at(0)?.amount).toBe(500);
});
