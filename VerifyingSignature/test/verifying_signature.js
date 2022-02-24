const VerifyingSignature = artifacts.require("VerifyingSignature");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("VerifyingSignature", function (accounts) {
  it("should assert true", function () {
    VerifyingSignature.deployed().then(instance => {
      let sender = accounts[0];
      let receiver = accounts[1];
      console.log(sender, 'sender', receiver)
      let message = web3.utils.soliditySha3(receiver, 10, 'Hello', 10);
      console.log(message, 'message')
      web3.eth.personal.sign(message, sender).then(res => {
        expect(instance.contract.methods.verify(sender, receiver, 10, 'Hello', 10, res).call()).to.equal(true);
      })
    })
  });
});
