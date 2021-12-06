class Bouncer {

  _theList: string[]

  constructor(theList: string[]) {
    this._theList = theList
  }

  bounced(str: string) {
    return !this.in(str)
  }

  in(str: string) {
    return this._theList.includes(str)
  }
}

export default Bouncer