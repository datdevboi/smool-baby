export const typeDefs = /* GraphQL */ `type AggregateBaby {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Baby {
  id: ID!
  name: String!
  dob: DateTime!
}

type BabyConnection {
  pageInfo: PageInfo!
  edges: [BabyEdge]!
  aggregate: AggregateBaby!
}

input BabyCreateInput {
  name: String!
  dob: DateTime!
}

input BabyCreateManyInput {
  create: [BabyCreateInput!]
  connect: [BabyWhereUniqueInput!]
}

type BabyEdge {
  node: Baby!
  cursor: String!
}

enum BabyOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  dob_ASC
  dob_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BabyPreviousValues {
  id: ID!
  name: String!
  dob: DateTime!
}

input BabyScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  dob: DateTime
  dob_not: DateTime
  dob_in: [DateTime!]
  dob_not_in: [DateTime!]
  dob_lt: DateTime
  dob_lte: DateTime
  dob_gt: DateTime
  dob_gte: DateTime
  AND: [BabyScalarWhereInput!]
  OR: [BabyScalarWhereInput!]
  NOT: [BabyScalarWhereInput!]
}

type BabySubscriptionPayload {
  mutation: MutationType!
  node: Baby
  updatedFields: [String!]
  previousValues: BabyPreviousValues
}

input BabySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BabyWhereInput
  AND: [BabySubscriptionWhereInput!]
  OR: [BabySubscriptionWhereInput!]
  NOT: [BabySubscriptionWhereInput!]
}

input BabyUpdateDataInput {
  name: String
  dob: DateTime
}

input BabyUpdateInput {
  name: String
  dob: DateTime
}

input BabyUpdateManyDataInput {
  name: String
  dob: DateTime
}

input BabyUpdateManyInput {
  create: [BabyCreateInput!]
  update: [BabyUpdateWithWhereUniqueNestedInput!]
  upsert: [BabyUpsertWithWhereUniqueNestedInput!]
  delete: [BabyWhereUniqueInput!]
  connect: [BabyWhereUniqueInput!]
  disconnect: [BabyWhereUniqueInput!]
  deleteMany: [BabyScalarWhereInput!]
  updateMany: [BabyUpdateManyWithWhereNestedInput!]
}

input BabyUpdateManyMutationInput {
  name: String
  dob: DateTime
}

input BabyUpdateManyWithWhereNestedInput {
  where: BabyScalarWhereInput!
  data: BabyUpdateManyDataInput!
}

input BabyUpdateWithWhereUniqueNestedInput {
  where: BabyWhereUniqueInput!
  data: BabyUpdateDataInput!
}

input BabyUpsertWithWhereUniqueNestedInput {
  where: BabyWhereUniqueInput!
  update: BabyUpdateDataInput!
  create: BabyCreateInput!
}

input BabyWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  dob: DateTime
  dob_not: DateTime
  dob_in: [DateTime!]
  dob_not_in: [DateTime!]
  dob_lt: DateTime
  dob_lte: DateTime
  dob_gt: DateTime
  dob_gte: DateTime
  AND: [BabyWhereInput!]
  OR: [BabyWhereInput!]
  NOT: [BabyWhereInput!]
}

input BabyWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createBaby(data: BabyCreateInput!): Baby!
  updateBaby(data: BabyUpdateInput!, where: BabyWhereUniqueInput!): Baby
  updateManyBabies(data: BabyUpdateManyMutationInput!, where: BabyWhereInput): BatchPayload!
  upsertBaby(where: BabyWhereUniqueInput!, create: BabyCreateInput!, update: BabyUpdateInput!): Baby!
  deleteBaby(where: BabyWhereUniqueInput!): Baby
  deleteManyBabies(where: BabyWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  baby(where: BabyWhereUniqueInput!): Baby
  babies(where: BabyWhereInput, orderBy: BabyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Baby]!
  babiesConnection(where: BabyWhereInput, orderBy: BabyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BabyConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  baby(where: BabySubscriptionWhereInput): BabySubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  password: String!
  babies(where: BabyWhereInput, orderBy: BabyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Baby!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  babies: BabyCreateManyInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  password: String
  babies: BabyUpdateManyInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  babies_every: BabyWhereInput
  babies_some: BabyWhereInput
  babies_none: BabyWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`