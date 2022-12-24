// node v19.2.0

import Workdir from './Workdir.mjs';

const parser = /\$\s+(?<cd>cd)\s+(?<path>.+)|\$\s+(?<ls>ls)|(?<dir>dir)\s+(?<dirname>.+)|(?<size>\d+)\s+(?<filename>.+)/;

// Parse the problem input and build a tree that represents the filesystem.
//
// @param {readline.Interface} input - The input object.
// @return {Node} The root of the tree.
export default async function buildFilesystem(input) {
  const nodes = { '/': { path: '/', type: 'dir', children: [], size: 0 } };
  let workdir = new Workdir;

  for await (const line of input) {
    let groups = line.match(parser).groups;
    if (groups.cd) {
      workdir.cd(groups.path);
    } else if (groups.dir) {
      let absolutePath = workdir.pwd() + groups.dirname + '/';
      nodes[absolutePath] ||= { path: absolutePath, type: 'dir', children: [], size: 0 };
      if (!nodes[workdir.pwd()].children.includes(nodes[absolutePath])) {
        nodes[workdir.pwd()].children.push(nodes[absolutePath]);
      }
    } else if (groups.filename) {
      let absolutePath = workdir.pwd() + groups.filename;
      nodes[absolutePath] ||= { path: absolutePath, type: 'file', children: [], size: Number(groups.size) };
      if (!nodes[workdir.pwd()].children.includes(nodes[absolutePath])) {
        nodes[workdir.pwd()].children.push(nodes[absolutePath]);
      }
      let cwd = new Workdir(workdir.pwd());
      while (cwd.length) {
        nodes[cwd.pwd()].size += Number(groups.size);
        cwd.cd('..');
      }
    } // ignore ls
  }

  return nodes['/'];
}
