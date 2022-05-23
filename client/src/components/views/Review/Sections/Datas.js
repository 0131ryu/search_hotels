const seasons = [
  { _id: 1, name: "봄" },
  { _id: 2, name: "여름" },
  { _id: 3, name: "가을" },
  { _id: 4, name: "겨울" },
];

const price = [
  {
    _id: 0,
    name: "모든 값",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $5",
    array: [0, 5],
  },
  {
    _id: 2,
    name: "$6 to $8",
    array: [6, 8],
  },
  {
    _id: 3,
    name: "$9 to $12",
    array: [9, 12],
  },
  {
    _id: 4,
    name: "more than $13",
    array: [13, 100],
  },
];

export { seasons, price };
