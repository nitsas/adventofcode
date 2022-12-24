// node v19.2.0

export default class Workdir {
  constructor(path = null) {
    if (path) {
      path = path.replace(/\/$/, '');
      this._path = path.split('/').map((dir) => dir + '/');
    } else {
      this._path = [];
    }
  }

  cd(where) {
    if (where === '..') {
      this._path.pop();
    } else if (where === '/') {
      this._path.push('/');
    } else {
      this._path.push(where + '/');
    }

    return this.pwd();
  }

  pwd() {
    return this._path.join('');
  }

  get length() {
    return this._path.length;
  }
}
