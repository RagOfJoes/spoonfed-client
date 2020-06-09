import { formatFileName } from 'lib/formatFileName';

/**
 *
 * @param {Array} arr1
 * @param {Array} arr2
 *
 * @returns {Boolean}
 */
const compare = (arr1, arr2) => {
	if (!arr1 || !arr2) return;

	let result;

	arr1.forEach((e1, i) =>
		arr2.forEach((e2) => {
			if (e1.length > 1 && e2.length) {
				result = compare(e1, e2);
			} else if (e1 !== e2) {
				result = false;
			} else {
				result = true;
			}
		})
	);

	return result;
};

export const handleImageUpload = async (files, setFiles, mutation, isMounted, values, initialValues) => {
	const cleanedMutation = files.filter((file) => !file.url).map((file) => ({ filename: file.name, filetype: file.type }));

	const hasUploadedImages = cleanedMutation.length > 0 && !compare(cleanedMutation, initialValues?.images);
	if (hasUploadedImages) {
		const { data } = await mutation({
			variables: {
				files: cleanedMutation,
			},
		});

		values.images = [];
		const { signS3Multiple } = data;
		// Wait 'till all the files have been uploaded
		const promises = signS3Multiple.map((key, index) => {
			if (!isMounted) return;

			const { signedUrl, fileUrl } = key;
			values.images.push({ name: files[index].name, url: fileUrl });

			const xhr = new XMLHttpRequest();
			xhr.open('PUT', signedUrl);
			xhr.setRequestHeader('Content-Type', files[index].type);
			return new Promise((resolve, reject) => {
				xhr.upload.addEventListener('progress', (e) => {
					const done = e.position || e.loaded;
					const total = e.totalSize || e.total;
					const perc = Math.floor((done / total) * 1000) / 10;

					const clone = files;
					clone[index].progress = perc;

					if (!isMounted) return xhr.abort();
					setFiles(clone);
				});

				xhr.onload = (e) => {
					resolve();
				};

				xhr.addEventListener('error', (e) => reject());
				xhr.addEventListener('abort', (e) => reject());

				xhr.send(files[index]);
			});
		});
		await Promise.all(promises);

		return values.images;
	}

	return files.map((file) => ({ name: file.name, url: file.url }));
};
