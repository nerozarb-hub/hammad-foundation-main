// Offline tests must never reach PayPro, a managed database, or any other network.
import net from 'node:net';
import https from 'node:https';
import http from 'node:http';
const denied = () => { throw new Error('Network is forbidden in offline tests'); };
globalThis.fetch = denied;
net.Socket.prototype.connect = denied;
https.request = denied;
http.request = denied;
