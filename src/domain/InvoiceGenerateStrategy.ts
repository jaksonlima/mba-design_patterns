import Contract from "./Contract";
import Invoice from "./Invoces";

export default interface InvoiceGenerationStrategy {
  generate(contract: Contract, month: number, year: number): Invoice[];
}
