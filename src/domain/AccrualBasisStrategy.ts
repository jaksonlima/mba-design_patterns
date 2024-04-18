import moment from "moment";

import Contract from "./Contract";
import Invoice from "./Invoces";
import InvoiceGenerationStrategy from "./InvoiceGenerateStrategy";

export default class AccrualBasisStrategy implements InvoiceGenerationStrategy {
  generate(contract: Contract, month: number, year: number): Invoice[] {
    const invoices: Invoice[] = [];
    let period = 0;

    while (period <= contract.periods) {
      const date = moment(contract.date).add(period++, "month").toDate();

      if (date.getMonth() + 1 !== month || date.getFullYear() !== year) {
        continue;
      }

      const amount = contract.amount / contract.periods;

      invoices.push(new Invoice(date, amount));
    }

    return invoices;
  }
}
