// const { pbkdf2 } =require('node:crypto');
// const crypto=require('crypto');
// pbkdf2("Sanjeev@51972","salt",100,6,"sha512-256WithRSAEncryption",(err,derivedKey)=>{
//   if(err) throw err;
//   console.log(derivedKey);
//   console.log(derivedKey.toString());
//   // As here derivedKey returning in buffer(<Buffer 7c 25 c1 8e 8d 62>) so to get that we use toString('hex');
      //7c25c18e8d62
//   console.log(derivedKey.toString('hex'));
// })

// const hash=crypto.getHashes();
// console.log(hash);


const {hkdf} =require('node:crypto');
hkdf("sha512-256WithRSAEncryption","","salt","",6,(err,derivedKey)=>{
  if(err) throw err;
  // Here the derivedKey is returning like ArrayBuffer { [Uint8Contents]: <05 49 7f ea a7 e2>, byteLength: 6 }. It is returning in ArrayBuffer
  console.log(derivedKey);
  // to get the value from the arrayBuffer derivedKey
  // 05497feaa7e2
  console.log(Buffer.from(derivedKey).toString('hex'));
})

