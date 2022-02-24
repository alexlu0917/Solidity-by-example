// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VerifyingSignature {
  /* 
  ** Hash of message which owner send receiver with some values.
  */
  function getMessageHash(address receiver, uint amount, string memory message, uint nonce) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(receiver, amount, message, nonce));
  }

  /*
  ** 
  */
  function getEthSignedMessageHash(bytes32 signedMessage) public pure returns (bytes32) {
    return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", signedMessage));
  }

  function verify(address signer, address to, uint amount, string memory message, uint nonce, bytes memory signature) public pure returns (bool) {
    bytes32 messageHash = getMessageHash(to, amount, message, nonce);
    bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

    return recoverSigner(ethSignedMessageHash, signature) == signer;
  }

  function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) public pure returns (address) {
    (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

    return ecrecover(_ethSignedMessageHash, v, r, s);
  }

  function splitSignature(bytes memory sig) public pure returns (bytes32 r, bytes32 s, uint8 v) {
    require(sig.length == 65, "invalid signature length");

    assembly {
      r := mload(add(sig, 32))
      s := mload(add(sig, 64))
      v := byte(0, mload(add(sig, 96)))
    }
  }
  
}
