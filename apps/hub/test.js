import bs58 from 'bs58';

const base58PrivateKey = 'enter your private key ';
const byteArray = bs58.decode(base58PrivateKey);

console.log(byteArray); // Uint8Array of bytes
