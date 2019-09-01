import { useQuery } from "@apollo/react-hooks";

import { IMeQueryResult, ME_QUERY } from "./Me";

const useMeQuery = () => {
  return useQuery<IMeQueryResult>(ME_QUERY);
};

export default useMeQuery;
