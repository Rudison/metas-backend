import { createConnections, Connection } from 'typeorm';

// createConnection();
createConnections().catch(e => console.log(e));
