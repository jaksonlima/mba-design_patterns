import UseCase from "../../application/UseCase";

export default class LoggerDecorator implements UseCase {
  constructor(readonly useCase: UseCase) {}

  execute(input: any): Promise<any> {
    console.log("Inicio UseCase");
    console.log("Body", input);

    const output = this.useCase.execute(input);

    console.log("Fim UseCase");
    return output;
  }
}
