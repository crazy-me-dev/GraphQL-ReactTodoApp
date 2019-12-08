function parseGraphQLError(graphQLErrorText: string) {
  const [, error] = graphQLErrorText.split("GraphQL error: ");
  return error;
}

export default parseGraphQLError;
