import HttpServer from "./HttpServer";
import UseCase from "../../application/UseCase";

export default class MainController {
  constructor(readonly httpServer: HttpServer, readonly usecase: UseCase) {
    httpServer.on(
      "post",
      "/generate-invoices",
      async (params: any, body: any, headers: any) => {
        const input = body;
        input.userAgent = headers["user-agent"];
        input.host = headers.host;

        const output = await usecase.execute(input);

        return output;
      }
    );
  }
}
