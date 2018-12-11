const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  scalar DateTime

  type Farm {
    farmID: ID!
    farm_name: String!
    start_date: DateTime!
    weeks_between_harvest: Float!
    annual_production_InKg: Float!
    final_culling_at_harvest_InPercent: Float!
    target_rearing_temperature_InCelsius: Float!
    target_Size_InGram: Float!
    initial_Size_InGram: Float!
    number_of_growout_states: Int!
    address: Address!
    rearing_units: [Rearing_Unit!]!
  }

  type Address{
    addressID: ID!
    line1: String
    line2: String
    subdistrict: String
    district: String
    province: String
    state: String
    country: String
    zip_Code: String
    full_Address: String
    farm: Farm!
  }

  type Species{
    speciesID: ID!
    species_name: String!
    add_On_Date: DateTime!
    suitable_farming_temperature_max_InCelsius: Float!
    suitable_farming_temperature_min_InCelsius: Float!
    rearing_units: [Rearing_Unit!]!
  }

  type TypeOfRearingUnit{
    typeOfRearingUnitID: ID!
    typeName: String!
    rearing_Capacity: Float!
    rearing_unit_volume: Float!
    description: String!
    rearing_Units: [Rearing_Unit!]
    volumn_unit: Unit!
  }

  type Rearing_Unit{
    rearing_unitID: ID!
    farm: Farm!
    species: Species!
    add_On_Date: DateTime!
    type_of_rearing_unit: TypeOfRearingUnit!
    description: String
    rearingParameter_FeedConversionRate: [RearingParameterFeedConversionRate!]
    rearingParameter_MaximumDensityAllowableFactor: [RearingParameterMaximumDensityAllowableFactor!]
    rearingParameter_RearingTemperature: [RearingParameterRearingTemperature!]
    rearingParameter_GrowthPerMonth: [RearingParameterGrowthPerMonth!]
    rearingParameter_ConditionFactor: [RearingParameterConditionFactor!]
  }

  type RearingParameterFeedConversionRate{
    rearingParameterFeedConversionRateID: ID!
    value: Float!
    recorded_on_Date: DateTime!
    rearing_Unit: Rearing_Unit!
    unit: Unit!
  }

  type RearingParameterMaximumDensityAllowableFactor{
    rearingParameterMaximumDensityAllowableFactorID: ID!
    value: Float!
    recorded_on_Date: DateTime!
    rearing_Unit: Rearing_Unit!
    unit: Unit!
  }

  type RearingParameterRearingTemperature{
    rearingParameterRearingTemperatureID: ID!
    value: Float!
    recorded_on_Date: DateTime!
    rearing_Unit: Rearing_Unit!
    unit: Unit!
  }

  type RearingParameterGrowthPerMonth{
    rearingParameterGrowthPerMonthID: ID!
    value: Float!
    recorded_on_Date: DateTime!
    rearing_Unit: Rearing_Unit!
    unit: Unit!
  }

  type RearingParameterConditionFactor{
    rearingParameterConditionFactorID: ID!
    value: Float!
    recorded_on_Date: DateTime!
    rearing_Unit: Rearing_Unit!
    unit: Unit!
  }

  type Unit{
    unitID: ID! 
    unit_Name: String!
    create_by: String!
    create_On: DateTime!
    description: String
    rearingParameterFeedConversionRate: [RearingParameterFeedConversionRate!]
    rearingParameterMaximumDensityAllowableFactor: [RearingParameterMaximumDensityAllowableFactor!]
    rearingParameterRearingTemperature: [RearingParameterRearingTemperature!]
    rearingParameterGrowthPerMonth: [RearingParameterGrowthPerMonth!]
    rearingParameterConditionFactor: [RearingParameterConditionFactor!]
    typeOfRearingUnits: [TypeOfRearingUnit!]
  }


  type Query {
    farms: [Farm!]!
    farm(farmID: ID!): Farm!
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
