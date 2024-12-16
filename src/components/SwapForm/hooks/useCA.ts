import {CA} from '@arcana/ca-sdk';


const provider = (window as any).ethereum
let caSDK: CA | null = null;

const useCaSdkAuth = async () => {
    console.log("useCaSdkAuth called");
  if (!caSDK) {
    caSDK = new CA(provider)
    await caSDK.init()
  }

  return caSDK
}

const getUnifiedBalance = async () => {
    console.log("unified Balance called");
    if(!caSDK){
      await useCaSdkAuth();
    }
    const balance = await caSDK!.getUnifiedBalances();
    let balances = 0;
    for (let i = 0; i < balance.length; i++) {
        console.log("balance", balance[i].balanceInFiat);
        balances += balance[i].balanceInFiat;
    }
    console.log("balances", typeof balances);
    return balances
    }


const getCABalance = async (caSDK: CA) => {
    const balance = await caSDK!.getUnifiedBalances();
    return balance
}

const useBridge = async (caSDK: CA, amount: number, chainID: number, symbol:string  ) => {
    console.log("useBridge called");
    console.log("amount", amount);
    console.log("chainID", chainID);
    console.log("symbol", symbol);

    try {
      const bridge = await caSDK.bridge().
        amount(amount).
        chain(chainID).
        token(symbol).
        exec();
    } catch (e) {
      console.error("Bridge failed with error", e);
    }
}


export { useCaSdkAuth, getUnifiedBalance, useBridge, getCABalance }
