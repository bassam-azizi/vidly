export function paginate(items, pageNumber, pageSize) {
  //  Here we make a new variable called startIndex, so our startPoint in our array items
  //  be dynamically and goes the way we want depend on the page number we click.
  var startIndex = (pageNumber - 1) * pageSize;
  //  here the dynamic variable is startIndex, Our array start always from the start index and take
  //  4 elements, so thats why we add the startIndex always to the static variable pageSize so it will always take
  //  4 element in the array just from the startIndex,
  return items.slice(startIndex, pageSize + startIndex);
}
