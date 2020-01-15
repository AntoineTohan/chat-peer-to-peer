import IMachine from "./IMachine";

export default interface ILoginState {
  machines: IMachine[];
  nameInput: string;
  ipInput: string;
}
