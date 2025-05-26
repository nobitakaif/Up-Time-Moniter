import bs58 from 'bs58';

const base58PrivateKey = '4XxHhR39vqv8AM2FcTqyVVTWfP4XTQQLDjTKNDP9WZNABRVfLqRooxW2rygfN5cTeWgfbtVUhmQEZ5a2fx3cuE6n';
const byteArray = bs58.decode(base58PrivateKey);

console.log(byteArray); // Uint8Array of bytes
