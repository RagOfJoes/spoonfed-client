/**
 * Gets pre-existing File or newly uploaded file
 * and creates a thumbnail
 * @param {File|String} file
 */
export const getPreview = (file) => {
	return Object.assign(file, {
		preview: file.url || URL.createObjectURL(file),
	});
};
