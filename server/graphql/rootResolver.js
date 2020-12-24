const getResult = (value = 10, length = 2, r = 300000) =>
  [...Array(length).keys()].map((k) => ({
    x: k + value,
    y: Math.floor(Math.random() * r),
  }));

const getRandomString = (n = 3) =>
  [...Array(n).keys()]
    .map(() => String.fromCharCode(65 + Math.round(25 * Math.random())))
    .join('');

const makeItem = ({ name, id, resultLength, r }) => {
  if (Math.random() > 0.7)
    throw new Error(`error in subsystem ${getRandomString()}`);

  return {
    idField: id,
    name,
    computed: ({ input: { value } }) => ({
      result: getResult(value, resultLength, r),
      calculationStatus: {
        message: null,
        status: Math.random() >= 0.6 ? 'OK' : 'ERROR',
      },
    }),
  };
};

const root = {
  items: () => ({
    typeA: () =>
      makeItem({
        name: 'type_A',
        id: 'abc.123',
      }),
    typeB: () =>
      makeItem({
        name: 'public',
        id: 'xyz.999',
        r: 200000,
      }),
  }),
  testMutation: (params) => {
    console.log(params);
    return {
      text: params.q,
    };
  },
};

module.exports = root;
