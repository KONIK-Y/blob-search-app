export function groupByFolder(paths: string[]) {
  const result: any = {};

  paths.forEach((path) => {
    path.split('/').reduce((acc, part, i, arr) => {
      if (i === arr.length - 1) {
        if (!acc.files) {
          acc.files = [];
        }
        acc.files.push(part); // part=filenameなので、ファイル名を追加partを追加するときにRequestパラメータ用raw pathを追加して紐づける。
      } else {
        acc[part] = acc[part] || {};
      }
      return acc[part];
    }, result);
  });
  console.log(result);

  return result;
}
