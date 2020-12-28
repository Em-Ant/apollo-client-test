const getResult = (value = 10, length = 2, r = 300000) =>
  [...Array(length).keys()].map((k) => ({
    x: k + value,
    y: Math.floor(Math.random() * r),
  }));

const getRandomString = (n = 3) =>
  [...Array(n).keys()]
    .map(() => String.fromCharCode(65 + Math.round(25 * Math.random())))
    .join('');

const makeItem = async ({ name, id, resultLength, r }) => {
  await new Promise((resolve) => setImmediate(resolve));

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
  items: async () => ({
    typeA: async () => [
      makeItem({
        name: 'type_A',
        id: 'abc.123',
      }),
    ],
    typeB: async () => [
      makeItem({
        name: 'type_B',
        id: 'xyz.999',
        r: 200000,
      }),
    ],
    byId: async ({ id }) => {
      const isA = Math.random() > 0.5;
      const isB = !isA;
      const __typename = isA ? 'ItemA' : 'ItemB';
      return {
        __typename,
        ...makeItem({
          name: isA ? 'type_A' : 'type_B',
          id,
        }),
        ...(isA && { extra: 'extra data' }),
        ...(isB && { moreInfo: 'more info' }),
      };
    },
  }),
  testMutation: (params) => {
    console.log(params);
    return {
      text: params.q,
    };
  },
};

module.exports = root;
