import { file } from 'tmp-promise';
import * as fs from 'fs';
import { longTo32ByteArray } from '../utils';
import { Signer } from '../signing/index';
import FileBundle from './FileBundle';
import FileDataItem from './FileDataItem';

export async function bundleAndSignData(
  dataItems: FileDataItem[],
  signer: Signer,
  dir?: string,
): Promise<FileBundle> {
  const headerFile = await file({ dir });
  const headerStream = fs.createWriteStream(headerFile.path);
  const files = new Array(dataItems.length);

  headerStream.write(longTo32ByteArray(dataItems.length));
  for (const [index, item] of dataItems.entries()) {
    let dataItem: FileDataItem;
    dataItem = item as FileDataItem;
    if (!dataItem.isSigned()) {
      await dataItem.sign(signer);
    }

    files[index] = dataItem.filename;
    headerStream.write(
      Buffer.concat([longTo32ByteArray(await dataItem.size()), dataItem.rawId]),
    );
  }

  await new Promise((resolve) => headerStream.end(resolve));

  headerStream.close();

  return new FileBundle(headerFile.path, files);
}
