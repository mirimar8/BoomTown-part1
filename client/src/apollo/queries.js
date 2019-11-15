import gql from "graphql-tag";

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    # @TODO: Create a fragment to query the following fields for an item:
  
        id
        title
        imageurl
        description
        created
        tags {
          id
          title
        }
        itemowner {
          id
          fullname
          email
          bio
        }
        borrower {
          id
          fullname
          email
          bio
        }
  }
`;
export const ITEM_QUERY = gql`
  query item($id: ID!) {
    item (id: $id) {
      ...ItemFields
    }
   
    # @TODO: Query an item by its id and return the ItemFields fragment.
  }
  ${ItemFields}
`;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }

    # @TODO: Query items (optionally by tag id) and return the ItemFields fragment.
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      bio
      email
      fullname
      items {
        ...ItemFields
      }
      borrowed {
        ...itemFields
      }
    }
    # @TODO: Query the bio, email, fullname, items, and borrowed for the user by id
    # Use the ItemFields fragment for the items and borrowed fields.
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
    # @TODO: Query the id and title fields for tags.
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!) {
    addItem(item: $item) {
      id
    }
    
    # @TODO: Pass the item and image into the addItem mutation as arguments
    # and return the new item id when the mutation is complete.
  }
`;

/**
 * Auth-related queries and mutations.
 */

export const VIEWER_QUERY = gql`
  query {
    viewer {
      id
      email
      fullname
      bio
    }
    # @TODO: Query the id, email, fullname, and bio fields for the viewer.
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation {
    logout

    # @TODO: Run the logout mutation.
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignupInput!) {
    signup(user: $user) {
      token
      user {
        id
      }
    }
    # @TODO: Pass the user into the signup mutation as an argument
    # and return the token and user id.
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user) {
      token
      user {
        id
      }
    }
    # @TODO: Pass the user into the login mutation as an argument
    # and return the token and user id.
  }
`;
