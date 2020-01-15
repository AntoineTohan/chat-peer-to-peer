import IMessage from "./IMessage";
import IUser from './IUser';

export default interface IChatState {
  chatMessage: string;
  user: IUser;
  chatMessages: IMessage[];
  allUsers: IUser[];
  socket: SocketIOClient.Socket;
}
