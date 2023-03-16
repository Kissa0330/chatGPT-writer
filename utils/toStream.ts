import { Readable } from "stream";


export function dataToStream(data: any):Readable {
	const stream = data as any as Readable;
	return stream;
  }
  