const VerifyingSignature = artifacts.require("VerifyingSignature");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("VerifyingSignature", function (accounts) {
  it("should assert true", async function () {
    let verifyContract = await VerifyingSignature.deployed();
    let sender = accounts[0];
    let receiver = accounts[1];
    console.log(sender, "sender", receiver);
    let message = web3.utils.soliditySha3(receiver, 10, "Hello", 10);
    console.log(message, "message", web3.eth.personal.sign);
    let signature = await web3.eth.personal.sign(message, sender);
    expect(
      await verifyContract.contract.methods
        .verify(sender, receiver, 10, "Hello", 10, signature)
        .call()
    ).to.equal(true);
  });
});
