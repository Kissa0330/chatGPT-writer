import { Readable } from "stream";


export async function dataToStream(data: any) {
	const stream = await data as any as Readable;
	return stream;
  }
  