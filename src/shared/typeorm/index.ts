import { createConnection, createConnections } from 'typeorm';

createConnections().catch(e => console.log(e));
