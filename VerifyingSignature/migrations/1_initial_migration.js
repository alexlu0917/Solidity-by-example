const Migrations = artifacts.require("VerifyingSignature");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
