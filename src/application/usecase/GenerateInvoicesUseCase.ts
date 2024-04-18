import ContractReponsitory from "../../domain/ContractRepository";
import Mediator from "../../infra/mediator/Mediator";
import Presenter from "../../infra/presenter/Presenter";
import UseCase from "../UseCase";

type Input = {
  month: number;
  year: number;
  type: string;
};

export type Output = {
  date: Date;
  amount: number;
};

export default class GenerateInvoicesUseCase implements UseCase {
  constructor(
    readonly repository: ContractReponsitory,
    readonly presenter: Presenter,
    readonly mediator: Mediator = new Mediator()
  ) {}

  async execute(input: Input): Promise<Output[]> {
    const contracts = await this.repository.list();

    const output: Output[] = [];

    for (const contract of contracts) {
      const invoices = contract.generateInvoices(
        input.month,
        input.year,
        input.type
      );

      for (const invoice of invoices) {
        output.push({
          date: invoice.date,
          amount: invoice.amount,
        });
      }
    }

    this.mediator.publish("InvoicesGenerated", output);

    return this.presenter.present(output);
  }
}
