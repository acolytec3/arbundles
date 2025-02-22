import { Signer } from "../Signer";
import base64url from "base64url";
import secp256k1 from "secp256k1";
import { SignatureConfig, SIG_CONFIG } from "../../constants";
import keccak256 from "keccak256";

export default class Secp256k1 implements Signer {
  readonly ownerLength: number = SIG_CONFIG[SignatureConfig.ETHEREUM].pubLength;
  readonly signatureLength: number =
    SIG_CONFIG[SignatureConfig.ETHEREUM].sigLength;
  readonly signatureType: SignatureConfig = SignatureConfig.ETHEREUM;
  public readonly pk: string;

  constructor(protected _key: string, pk: Buffer) {
    this.pk = pk.toString("hex");
  }

  public get publicKey(): Buffer {
    return Buffer.alloc(0);
  }

  public get key(): Uint8Array {
    return Buffer.from(this._key, "hex");
  }

  static async verify(
    pk: string | Buffer,
    message: Uint8Array,
    signature: Uint8Array,
  ): Promise<boolean> {
    let p = pk;
    if (typeof pk === "string") p = base64url.toBuffer(pk);
    let verified = false;
    try {
      verified = secp256k1.ecdsaVerify(
        signature,
        keccak256(message),
        p as Buffer,
      );
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return verified;
  }

  sign(message: Uint8Array): Uint8Array {
    return secp256k1.ecdsaSign(keccak256(message), Buffer.from(this.key))
      .signature;
  }
}
