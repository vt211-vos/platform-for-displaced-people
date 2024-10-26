import Server from "./src/lib/server";
import {PORT} from "./src/lib/env";

const server = new Server();
server.listen(PORT)
