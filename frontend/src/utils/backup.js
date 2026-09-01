/**
 * Export all todos as a downloadable JSON file
 */
export const exportTodosToJson = (todos) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(todos, null, 2));
  const downloadAnchor = document.createElement('a');
  const filename = `ziptrip-todos-backup-${new Date().toISOString().slice(0, 10)}.json`;

  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

/**
 * Import todos from a selected JSON file
 */
export const importTodosFromJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        if (!Array.isArray(parsedData)) {
          throw new Error('Imported JSON file must contain an array of todo items.');
        }
        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
