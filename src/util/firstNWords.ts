
const firstNWords = (s: string, n: number) => {
  // ?: non-capturing subsequent sp+word.Change {} if you want to require n instead of allowing fewer
  var a = s.match(new RegExp('[\\w\\.]+' + '(?:[\\s-]*[\\w\\.]+){0,' + (n - 1) + '}')); 
  return  (a === undefined || a === null) ? '' : a[0];
}

export default firstNWords