import pgp from "pg-promise";

import DatabaseConnection from "./DatabaseConnection";

export default class PgPromiseAdapter implements DatabaseConnection {
  connection: any;

  constructor() {
    this.connection = pgp()("postgres://root:12345@localhost:5432/app");
  }

  query(aQuery: string, params: any): Promise<any> {
    return this.connection.query(aQuery, params);
  }

  close(): Promise<any> {
    return this.connection.$pool.end();
  }
}
