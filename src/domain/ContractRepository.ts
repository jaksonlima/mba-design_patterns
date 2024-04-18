import Contract from "./Contract";

export default interface ContractReponsitory {
  list(): Promise<Contract[]>;
}
