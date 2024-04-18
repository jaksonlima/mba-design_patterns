import Contract from "../../domain/Contract";
import ContractReponsitory from "../../domain/ContractRepository";
import DatabaseConnection from "./DatabaseConnection";
import Payment from "../../domain/Payment";

export default class ContractDatabaseReponsitory
  implements ContractReponsitory
{
  constructor(readonly connection: DatabaseConnection) {}

  async list(): Promise<Contract[]> {
    this.connection;

    const contractsData = await this.connection.query(
      "select * from jaksonlima.contract",
      []
    );

    const contracts: Contract[] = [];

    for (const contractData of contractsData) {
      const aContract = new Contract(
        contractData.id_contract,
        contractData.description,
        parseFloat(contractData.amount),
        contractData.periods,
        contractData.date
      );

      const paymentsData = await this.connection.query(
        "select * from jaksonlima.payment where id_contract = $1",
        [aContract.idContract]
      );

      for (const paymentData of paymentsData) {
        const aPayment = new Payment(
          paymentData.id_payment,
          paymentData.date,
          parseFloat(paymentData.amount)
        );

        aContract.addPayment(aPayment);
      }

      contracts.push(aContract);
    }

    return contracts;
  }
}
