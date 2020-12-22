const getResult = (value = 67, length = 2, r = 300000) =>
  [...Array(length).keys()].map((k) => ({
    x: k + value,
    y: Math.floor(Math.random() * r),
  }));

const makeItem = ({ name, id, planLength, r }) => {
  return {
    idField: id,
    name,
    computed: ({ input: { value } }) => ({
      result: getResult(value, planLength, r),
      calculationStatus: {
        message: null,
        status: Math.random() >= 0.5 ? 'OK' : 'ERROR',
      },
    }),
  };
};

const root = {
  items: () => ({
    typeA: makeItem({
      name: 'type_A',
      id: 'abc.123',
    }),
    typeB: makeItem({
      name: 'public',
      id: 'xyz.999',
      r: 200000,
    }),
  }),
  test: (params) => {
    console.log(params);
    return {
      text: params.q,
    };
  },
};

module.exports = root;
