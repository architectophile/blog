const handleTransaction = (trasaction) => {
  const beneficiary;

  let tx; // transaction object
  let intrinsicGas;
  let upfrontCost;
  let gasAvailable;
  let gasRemained;
  let gasRefunded;
  let refundCost;
  let fee;


  // 1. Transaction Validity
  
  // check RLP encoding.
  try {
   tx = rlpDecode(trasaction);  // parse the transaction.
  } catch (e) {
    throw 'RLP decoding failed!';
  }

  // verify tx signature.
  if (!verifySignature(tx.sig, tx.account))
    throw 'Signature verification failed!';

  // check tx nonce.
  if (getAccountNonce(tx.account) !== tx.nonce)
    throw 'Transaction nonce is invalid!';

  // check intrinsic gas.
  intrinsicGas = calIntrinsicGas(tx);
  if (intrinsicGas >= tx.gasLimit)
    throw 'Gas limit is less than intrinsic gas!';

  // check upfront cost.
  upfrontCost = tx.value + tx.gasLimit * tx.gasPrice;
  if (getAccountBalance(tx.account) < upfrontCost)
    throw 'Account balance is less than upfront cost!';


  // 2. Transaction Execution

  // increase account nonce by 1.
  increaseAccountNonce(tx.account);

  // Subtract upfront cost from account balance .
  decreaseAccountBalance(tx.account, upfrontCost);

  // Calculate available gas.
  gasAvailable = tx.gasLimit - intrinsicGas;

  // Execute operations.
  try {
    gasRemained = executeTransaction(tx, gasAvailable);
  } catch (e) {
    // out of gas, revert, exceptions.
    throw 'Transaction execution failed!'
  }

  // Refund gas for 'SELFDESTRUCT`, 'SSTORE' operations.
  gasRefunded = calGasRefund(tx);

  // Refund the remaining gas.
  gasRefunded += gasRemained;

  // Calculate refund cost.
  refundCost = gasRefunded * tx.gasPrice;

  // Refund cost.
  increaseAccountBalance(tx.account, refundCost);

  // Pay mining fee.
  fee = upfrontCost - refundCost;
  increaseAccountBalance(beneficiary, fee);

  return true;
}
