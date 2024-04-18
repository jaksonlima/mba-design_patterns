import UseCase from "../UseCase";

export default class SendEmailUseCase implements UseCase {
  execute(input: any): void {
    console.log("Disparo do email, body:", input);
  }
}
