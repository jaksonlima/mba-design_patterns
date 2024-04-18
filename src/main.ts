import ContractDatabaseReponsitory from "./infra/db/ContractDatabaseReponsitory";
import ExpressAdapter from "./infra/controller/ExpressAdapter";
import GenerateInvoicesUseCase from "./application/usecase/GenerateInvoicesUseCase";
import JsonPresenter from "./infra/presenter/JsonPresenter";
import LoggerDecorator from "./infra/decorator/LoggerDecorator";
import MainController from "./infra/controller/MainController";
import PgPromiseAdapter from "./infra/db/PgPromiseAdapter";
import Mediator from "./infra/mediator/Mediator";
import SendEmailUseCase from "./application/usecase/SendEmailUseCase";

const connection = new PgPromiseAdapter();
const repository = new ContractDatabaseReponsitory(connection);

const sendEmailUseCase = new SendEmailUseCase();

const mediator = new Mediator();
mediator.on("InvoicesGenerated", (data: any) => {
  console.log("Chegou o evento InvoicesGenerated: ", data);

  sendEmailUseCase.execute(data);
});

const jsonPresenter = new JsonPresenter();
const generateInvoicesUseCase = new GenerateInvoicesUseCase(
  repository,
  jsonPresenter,
  mediator
);
const loggerDecorator = new LoggerDecorator(generateInvoicesUseCase);

const express = new ExpressAdapter();

new MainController(express, loggerDecorator);

express.listen(3000);
