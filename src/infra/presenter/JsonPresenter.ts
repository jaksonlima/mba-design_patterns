import { Output } from "../../application/usecase/GenerateInvoicesUseCase";
import Presenter from "./Presenter";

export default class JsonPresenter implements Presenter {
  present(output: Output[]) {
    return output;
  }
}
