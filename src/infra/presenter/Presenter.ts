import { Output } from "../../application/usecase/GenerateInvoicesUseCase";

export default interface Presenter {
  present(output: Output[]): any;
}
