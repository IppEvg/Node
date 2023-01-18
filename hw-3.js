import { Transform } from "stream";
import { createReadStream, createWriteStream } from "fs";

const rs = createReadStream('./access_tmp.log');

const ip89Name = '89.123.1.41';
const ip34Name = '34.48.240.111';
const ws89 = createWriteStream(`${ip89Name}_requests.log`);
const ws34 = createWriteStream(`${ip34Name}_requests.log`);

const transformStreamFrom89 = new Transform({
    transform(chunk, encoding, callback) {
        const edditedChunk = chunk.toString()
            .match(/\d+\.\d+\.\d+\.\d+.+"curl\/7.47.0"/ig);
        let ip89 = edditedChunk.filter((item) => item.startsWith(ip89Name)).join('\n\r') + '\n\r'
        this.push(ip89);
        callback()
    }
})
const transformStreamFrom34 = new Transform({
    transform(chunk, encoding, callback) {
        const edditedChunk = chunk.toString()
            .match(/\d+\.\d+\.\d+\.\d+.+"curl\/7.47.0"/ig);
        let ip34 = edditedChunk.filter((item) => item.startsWith(ip34Name)).join('\n\r') + '\n\r';
        this.push(ip34);
        callback()
    }
})
rs.pipe(transformStreamFrom89).pipe(ws89);
rs.pipe(transformStreamFrom34).pipe(ws34)