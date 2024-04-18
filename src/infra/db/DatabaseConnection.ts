export default interface DatabaseConnection {
  query(aQuery: string, params: any): Promise<any>;
  close(): Promise<any>;
}
