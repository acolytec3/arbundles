import { bundleAndSignData, unbundleData } from "./ar-data-bundle";
import Bundle from "./Bundle";
import DataItem, { MIN_BINARY_SIZE } from "./DataItem";
import { deepHash } from "./deepHash";
import { DataItemCreateOptions } from "./ar-data-base";
import { createData } from "./ar-data-create";
import { verifyAndIndexStream } from "./stream";
import { ArweaveSigner } from "./signing";
import SolanaSigner from "./signing/chains/SolanaSigner";
import EthereumSigner from "./signing/chains/ethereumSigner";

export {
  MIN_BINARY_SIZE,
  Bundle,
  DataItem,
  createData,
  bundleAndSignData,
  unbundleData,
  deepHash,
  DataItemCreateOptions,
  verifyAndIndexStream,
};

const signers = {
  ArweaveSigner,
  SolanaSigner,
  EthereumSigner,
};

export { signers };
