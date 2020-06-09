import { getPreview } from 'lib/getPreview';
import { useDropzone } from 'react-dropzone';
import { bytesToSize } from 'lib/bytesToSize';
import { formatFileName } from 'lib/formatFileName';

/**
 * @param {Object} props
 * @param {Function} format
 * @param {Number} maxFiles
 * @param {Array} files
 * @param {Function} setError
 * @param {Function} setFiles
 * @param {Function} setUploadSize
 */
export default (
	{ disabled, multiple, maxSize, accept },
	format = formatFileName,
	maxFiles,
	files,
	setError,
	setFiles,
	setUploadSize
) =>
	useDropzone({
		disabled,
		accept: accept,
		noKeyboard: true,
		maxSize: maxSize,
		multiple: multiple,
		onDrop: (acceptedFiles, rejectedFiles, e) => {
			setError('');
			let uSize = 0;
			setUploadSize(0);

			if (rejectedFiles.length > 0) {
				try {
					if (rejectedFiles[0].errors[0].code) setError(`File cannot exceed ${bytesToSize(maxSize)}`);
					else setError(rejectedFiles[0].errors[0].message);
				} catch {}
			}

			if (acceptedFiles.length > maxFiles) return setError(`Cannot upload more than ${maxFiles} files!`);

			files.forEach((f) => URL.revokeObjectURL(f.preview));

			const filtered = acceptedFiles.filter((file) => {
				const temp = uSize + file.size;
				if (temp > maxSize) return false;
				uSize = temp;
				return true;
			});
			setUploadSize(uSize);

			const newFiles = filtered.map((file) => {
				const preview = getPreview(file);

				return new File([preview], format(file.name));
			});

			setFiles(newFiles || []);
		},
	});
