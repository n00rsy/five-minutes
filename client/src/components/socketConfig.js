import socketIOClient from "socket.io-client";

const ENDPOINT = "localhost:4001";
const socket = socketIOClient(ENDPOINT);
export default socket;