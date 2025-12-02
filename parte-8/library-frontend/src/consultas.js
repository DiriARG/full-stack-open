import { gql } from "@apollo/client";

// Mismo nombre que fue definido en el esquema del backend (index.js).
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;
