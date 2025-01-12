import { UploadFile, UploadProps, notification, Upload, Button, GetProp, Modal } from "antd";
import { useMemo, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const ImportCSV = () => {
    const [file, setFile] = useState<UploadFile | null>(null);
    const [uploading, setUploading] = useState(false);
    const [validating, setValidating] = useState(false);
    const [startUploadingConfirmation, setStartUploadingConfirmation] = useState(false);
    const [csvValidationConfirmation, setCSVValidationConfirmation] = useState(false);

    const createWorker = (callback: (worker: Worker) => void) => {
        const worker = new Worker(new URL('/workers/csvValidator.worker.js', import.meta.url), {
            type: 'module',
        });
        
        worker.onmessage = (event: any) => {
            const { valid, errors } = event.data;
            setValidating(false);
            if (valid) {
                setStartUploadingConfirmation(true);
                notification.success({
                    message: 'Validated successfully',
                    placement: 'topRight',
                });
            } else {
                setFile(null);
                (errors as string[])?.forEach((error, index) => {

                    if(index > 5) return;

                    notification.error({
                        message: error,
                        placement: 'topRight',
                    });
                });
            }
        };

        worker.onerror = (error) => {
            console.error('Worker error:', error);
        };

        callback(worker);
    }

    const uploadProps: UploadProps = useMemo(() => ({
        fileList: file ? [file] : [],
        onRemove: () => {
            setFile(null);
        },
        beforeUpload: (file) => {
            const isCsv = file.type === 'text/csv';
            if (!isCsv) {
                notification.error({
                    message: `${file.name} is not a CSV file. Please upload a valid CSV.`,
                    placement: 'topRight',
                });
                return Upload.LIST_IGNORE;
            }

            setFile(file);
            setCSVValidationConfirmation(true);
            return false;
        },
        maxCount: 1
    }), [file]);

    const validateCSVFile = (file: File) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const csvData = e.target?.result as string;
            setValidating(true);
            notification.info({
                message: 'Validating... please wait...',
                placement: 'topRight',
            });
            createWorker((worker) => {
                worker.postMessage(csvData);
            })
        };

        reader.readAsText(file); // Read the file content as a text string
    };

    const handleUpload = () => {
        const formData = new FormData();

        formData.append('files[]', file as FileType);
        setUploading(true);

        fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFile(null);
                console.log('upload successfully.');
            })
            .catch(() => {
                console.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const handleCSVValidationConfirmation = () => {
        setCSVValidationConfirmation(false);
        if (file as any) {
            validateCSVFile(file as any);
        } else {
            notification.error({
                message: 'Something went wrong',
                placement: 'topRight',
            })
        }
    }

    const handleCSVValidationCancel = () => {
        setCSVValidationConfirmation(false);
        setFile(null);
    }

    const handleStartUploadingConfirmation = () => {
        setStartUploadingConfirmation(false);
        handleUpload();
    }

    const handleStartUploadingCancel = () => setStartUploadingConfirmation(false);

    return (
        <>
            <Upload accept=".csv" multiple={false} {...uploadProps}>
                <Button loading={validating} icon={<UploadOutlined />}>
                    { validating ? 'Validating...' : 'Import' }
                </Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={file === null}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>

            <Modal title="Start validating the file?"
                open={csvValidationConfirmation}
                onOk={handleCSVValidationConfirmation}
                onCancel={handleCSVValidationCancel}>
            </Modal>

            <Modal title="CSV has been validated"
                open={startUploadingConfirmation}
                onOk={handleStartUploadingConfirmation}
                onCancel={handleStartUploadingCancel}>
                <p>Do you want to start uploading?</p>
            </Modal>
        </>
    );
}
