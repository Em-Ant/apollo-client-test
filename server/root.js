const getPayoutPlan = (startAge = 67, length = 2, amount = 300000) =>
  [...Array(length === 'lifelong' ? 100 - startAge : length).keys()].map(
    (k) => ({
      age: k + startAge,
      amount,
    }),
  );

const getContract = ({ name, id, planLength, amount }) => {
  return {
    custId: id,
    name,
    prognosis: ({ input: { startAge } }) => ({
      payoutPlan: getPayoutPlan(startAge, planLength, amount),
      simulationStatus: {
        message: null,
        status: Math.random() >= 0.5 ? 'OK' : 'SIMULATION_ERROR',
      },
    }),
  };
};

const root = {
  contracts: () => ({
    nav: getContract({
      name: 'nav',
      id: 'nav',
    }),
    public: getContract({
      name: 'public',
      id: 'off.1',
      amount: 450000,
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
