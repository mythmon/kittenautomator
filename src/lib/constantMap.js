export default function(names) {
  let res = {};
  for (let name of names) {
    res[name] = name;
  }
  return res;
}
