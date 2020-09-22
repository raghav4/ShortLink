function exportJson(el) {
  const obj = {
    a: 123,
    b: '4 5 6',
  };
  const data = `text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(obj),
  )}`;
  el.setAttribute('href', `data:${data}`);
  el.setAttribute('download', 'data.json');
}
