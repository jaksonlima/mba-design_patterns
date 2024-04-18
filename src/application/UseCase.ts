export default interface UseCase {
  execute(input: any): Promise<any> | Promise<void> | any | void;
}
