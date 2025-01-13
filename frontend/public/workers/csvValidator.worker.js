import Papa from "papaparse";

const BATCH_SIZE = 1000;

self.onmessage = (event) => {
    let rowCount = 0;
    let valid = true;

    try {
        Papa.parse(event.data, {
            header: true,
            skipEmptyLines: true,
            step: (row) => {
                rowCount++;
                const errors = [];

                if(!row?.data?.productName) {
                    valid = false;
                    errors.push(`Product name is missing at row ${rowCount}`);
                    self.close();
                }
                
                if(!row?.data?.SKU) {
                    valid = false;
                    errors.push(`SKU is missing at row ${rowCount}`);
                    self.close();
                }

                if(!row?.data?.description) {
                    valid = false;
                    errors.push(`Description is missing at row ${rowCount}`);
                    self.close();
                }

                if(!row?.data?.price) {
                    valid = false;
                    errors.push(`Price is missing at row ${rowCount}`);
                    self.close();
                }

                if(isNaN(row?.data?.price)) {
                    valid = false;
                    errors.push(`Price is not a number at row ${rowCount}`);
                    self.close();
                }

                if(!valid) {
                    self.postMessage({
                        valid,
                        errors
                    })
                }
            }, 
            complete: () => {
                console.log('Complete');
                self.postMessage({
                    valid,
                    errors: []
                })
            },
            error: (err) => {
                console.log('err');
                self.postMessage({err})
            },
        });
    } catch (err) {
        self.postMessage({ err })
    }
}
