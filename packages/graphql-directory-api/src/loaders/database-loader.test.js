import loader from './database-loader';

describe('index', () => {

  it('generates empty array without files', () => {
    expect(loader.bind({
      options: {
        database: {
        }
      }
    })()).toEqual('module.exports = [];');
  });

  it('generates empty array', () => {
    expect(loader.bind({
      options: {
        database: {
          files: []
        }
      }
    })()).toEqual('module.exports = [];');
  });

  it('generates a database', () => {
    expect(loader.bind({
      options: {
        database: {
          files: ['../../__utils__/database-loader-file.txt']
        }
      }
    })()).toEqual(`module.exports = [require("${process.cwd()}/__utils__/database-loader-file.txt")];`);
  });
});
