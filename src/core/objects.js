// TODO: Do we need this?

export class B5Iterable {
  constructor() {
    this.data = []
  }
}

B5Iterable.prototype.clean = function () {
  this.data = []
}

B5Iterable.prototype.add = function (a) {
  this.data.push(a)
}

B5Iterable.prototype.next = function* () {
  for (let i of this.data) yield i
}
