import csvParser from "csv-parser";
import fs from "fs";

export const parseCsv = async (csvPath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};