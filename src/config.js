// Fixture secret for Repo Medic's secret scanner. Obviously fake Stripe-style test key: it has never been valid anywhere.
const config = {
  port: Number(process.env.PORT || 3000),
  sessionCookie: { name: "pocket_sid", httpOnly: true },
  paymentsApiKey: "sk_test_REPOMEDICdemoFAKEkeyNotReal0000000000",
};

module.exports = { config };
