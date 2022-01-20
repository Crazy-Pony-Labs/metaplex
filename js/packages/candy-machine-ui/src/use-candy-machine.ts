import { useEffect, useMemo, useState, useCallback } from 'react';
import * as anchor from '@project-serum/anchor';

import { useWallet } from '@solana/wallet-adapter-react';
import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  getCandyMachineState,
  mintOneToken,
  mintMultipleToken
} from './candy-machine';
import { AlertState } from './utils';
import { toDate } from './utils';

export interface UseCandyMachineProps {
  candyMachineId?: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  txTimeout: number;
  rpcHost: string;
}

export default function useCandyMachine(props: UseCandyMachineProps) {
  const [mintStartDate, setMintStartDate] = useState<Date | undefined>(undefined);
  const [isUserMinting, setIsUserMinting] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: '',
    severity: undefined,
  });

  const wallet = useWallet();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const refreshCandyMachineState = useCallback(async () => {
    if (!anchorWallet) {
      return;
    }

    if (props.candyMachineId) {
      try {
        const cndy = await getCandyMachineState(
          anchorWallet,
          props.candyMachineId,
          props.connection,
        );
        setCandyMachine(cndy);
        setIsSoldOut(candyMachine?.state.itemsAvailable === 0);
        setMintStartDate(toDate(
          candyMachine?.state.goLiveDate
          ? candyMachine?.state.goLiveDate
          : candyMachine?.state.isPresale
          ? new anchor.BN(new Date().getTime() / 1000)
          : undefined,
        ));
      } catch (e) {
        console.log('There was a problem fetching Candy Machine state');
        console.log(e);
      }
    }
  }, [anchorWallet, props.candyMachineId, props.connection, candyMachine?.state.goLiveDate, candyMachine?.state.isPresale, candyMachine?.state.itemsAvailable]);

  const onMint = async () => {
    try {
      setIsUserMinting(true);
      document.getElementById('#identity')?.click();
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintTxId = (
          await mintOneToken(candyMachine, wallet.publicKey)
        )[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            props.txTimeout,
            props.connection,
            true,
          );
        }

        if (status && !status.err) {
          setAlertState({
            open: true,
            message: 'Congratulations! Mint succeeded!',
            severity: 'success',
          });
        } else {
          setAlertState({
            open: true,
            message: 'Mint failed! Please try again!',
            severity: 'error',
          });
        }
      }
    } catch (error: any) {
      let message = error.msg || 'Minting failed! Please try again!';
      if (!error.msg) {
        if (!error.message) {
          message = 'Transaction Timeout! Please try again.';
        } else if (error.message.indexOf('0x137')) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf('0x135')) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: 'error',
      });
    } finally {
      setIsUserMinting(false);
    }
  };

  const onMintMultiple = async (quantity: number) => {
    try {
      setIsUserMinting(true);
      document.getElementById('#identity')?.click();
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const signedTransactions: any = await mintMultipleToken(candyMachine, wallet.publicKey, quantity);
        const promiseArray = [];
        

        for (let index = 0; index < signedTransactions.length; index++) {
          const tx = signedTransactions[index];
          promiseArray.push(awaitTransactionSignatureConfirmation(
            tx,
            props.txTimeout,
            props.connection,
            true
          ))
        }

        const allTransactionsResult = await Promise.all(promiseArray)
        let totalSuccess = 0;
        let totalFailure = 0;

        for (let index = 0; index < allTransactionsResult.length; index++) {
          const transactionStatus = allTransactionsResult[index];
          if (!transactionStatus?.err) {
            totalSuccess += 1
          } else {
            totalFailure += 1
          }
        }

        if (totalSuccess) {
          setAlertState({
            open: true,
            message: `Congratulations! ${totalSuccess} mints succeeded! Your NFT's should appear in your wallet soon :)`,
            severity: 'success',
          });
        }

        if (totalFailure) {
          setAlertState({
            open: true,
            message: `Some mints failed! ${totalFailure} mints failed! Check on your wallet :(`,
            severity: 'warning',
          });
        }
      }
    } 
    catch (error: any) {
      let message = error.msg || 'Minting failed! Please try again!';
      if (!error.msg) {
        if (!error.message) {
          message = 'Transaction Timeout! Please try again.';
        } else if (error.message.indexOf('0x137')) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf('0x135')) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: 'error',
      });
    } 
    finally {
      setIsUserMinting(false);
    }
  };

  useEffect(() => {
    refreshCandyMachineState();
  }, [
    anchorWallet,
    props.candyMachineId,
    props.connection,
    refreshCandyMachineState,
  ]);

  return { isUserMinting, isSoldOut, mintStartDate, alertState, setAlertState, candyMachine, onMint, onMintMultiple };
}