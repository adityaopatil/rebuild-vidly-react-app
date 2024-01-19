export default function (path, items) {
  const sortCol = { ...items };
  if (sortCol.path === path) {
    sortCol.order = sortCol.order === "asc" ? "desc" : "asc";
  } else {
    sortCol.path = path;
    sortCol.order = "asc";
  }
  return sortCol;
}
