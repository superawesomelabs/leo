import path from 'path';
export default function loadData(files) {
  const data = files.map(filepath => require(path.resolve(process.cwd(), filepath)));
};
