import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateScalar: any;
};

export type Annotation = {
  __typename?: 'Annotation';
  bold?: Maybe<Scalars['Boolean']>;
  italic?: Maybe<Scalars['Boolean']>;
  strikethrough?: Maybe<Scalars['Boolean']>;
  underline?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['Boolean']>;
  color?: Maybe<Scalars['String']>;
};

export type Block = {
  __typename?: 'Block';
  id?: Maybe<Scalars['String']>;
  hasChildren?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  blocks?: Maybe<PaginatedListBlock>;
  text?: Maybe<Array<Maybe<RichText>>>;
  markdown?: Maybe<Scalars['String']>;
};

export type Date = {
  __typename?: 'Date';
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};

export type DateFilterInput = {
  equals?: Maybe<Scalars['DateScalar']>;
  before?: Maybe<Scalars['DateScalar']>;
  after?: Maybe<Scalars['DateScalar']>;
  on_or_before?: Maybe<Scalars['DateScalar']>;
  is_empty?: Maybe<Scalars['Boolean']>;
  is_not_empty?: Maybe<Scalars['Boolean']>;
  on_or_after?: Maybe<Scalars['DateScalar']>;
};


export type FilterInput = {
  and?: Maybe<Array<Maybe<FilterInput>>>;
  or?: Maybe<Array<Maybe<FilterInput>>>;
  property?: Maybe<Scalars['String']>;
  text?: Maybe<TextFilterInput>;
  number?: Maybe<NumberFilterInput>;
  select?: Maybe<SelectFilterInput>;
  multi_select?: Maybe<MultiSelectFilterInput>;
  date?: Maybe<DateFilterInput>;
};

export type MultiSelectFilterInput = {
  contains?: Maybe<Scalars['String']>;
  does_not_contain?: Maybe<Scalars['String']>;
  is_empty?: Maybe<Scalars['Boolean']>;
  is_not_empty?: Maybe<Scalars['Boolean']>;
};

export type NumberFilterInput = {
  equals?: Maybe<Scalars['Float']>;
  does_not_equal?: Maybe<Scalars['Float']>;
  greater_than?: Maybe<Scalars['Float']>;
  less_than?: Maybe<Scalars['Float']>;
  greater_than_or_equal_to?: Maybe<Scalars['Float']>;
  less_than_or_equal_to?: Maybe<Scalars['Float']>;
  is_empty?: Maybe<Scalars['Boolean']>;
  is_not_empty?: Maybe<Scalars['Boolean']>;
};

export type PaginatedListBlock = {
  __typename?: 'PaginatedListBlock';
  hasMore?: Maybe<Scalars['Boolean']>;
  nextCursor?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Block>>>;
};

export type PaginatedListbooks = {
  __typename?: 'PaginatedListbooks';
  hasMore?: Maybe<Scalars['Boolean']>;
  nextCursor?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Books>>>;
};

export type PaginatedListessays = {
  __typename?: 'PaginatedListessays';
  hasMore?: Maybe<Scalars['Boolean']>;
  nextCursor?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Essays>>>;
};

export type PaginatedListkevins42HabitsToBoostYourProductivity = {
  __typename?: 'PaginatedListkevins42HabitsToBoostYourProductivity';
  hasMore?: Maybe<Scalars['Boolean']>;
  nextCursor?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Kevins42HabitsToBoostYourProductivity>>>;
};

export type PaginatedListpage = {
  __typename?: 'PaginatedListpage';
  hasMore?: Maybe<Scalars['Boolean']>;
  nextCursor?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Page>>>;
};

export type PaginatedListposts = {
  __typename?: 'PaginatedListposts';
  hasMore?: Maybe<Scalars['Boolean']>;
  nextCursor?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Posts>>>;
};

export type PaginatedListstratechery = {
  __typename?: 'PaginatedListstratechery';
  hasMore?: Maybe<Scalars['Boolean']>;
  nextCursor?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Stratechery>>>;
};

export type PaginatedListtechnical = {
  __typename?: 'PaginatedListtechnical';
  hasMore?: Maybe<Scalars['Boolean']>;
  nextCursor?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<Technical>>>;
};

export type Query = {
  __typename?: 'Query';
  page?: Maybe<Page>;
  pages?: Maybe<PaginatedListpage>;
  post?: Maybe<Posts>;
  posts?: Maybe<PaginatedListposts>;
  book?: Maybe<Books>;
  books?: Maybe<PaginatedListbooks>;
  stratechery?: Maybe<Stratechery>;
  stratecheries?: Maybe<PaginatedListstratechery>;
  technical?: Maybe<Technical>;
  technicals?: Maybe<PaginatedListtechnical>;
  kevins42HabitsToBoostYourProductivity?: Maybe<Kevins42HabitsToBoostYourProductivity>;
  kevins42HabitsToBoostYourProductivities?: Maybe<PaginatedListkevins42HabitsToBoostYourProductivity>;
  essay?: Maybe<Essays>;
  essays?: Maybe<PaginatedListessays>;
};


export type QueryPageArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPagesArgs = {
  filter?: Maybe<FilterInput>;
  sorts?: Maybe<Array<Maybe<SortInput>>>;
};


export type QueryPostArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPostsArgs = {
  filter?: Maybe<FilterInput>;
  sorts?: Maybe<Array<Maybe<SortInput>>>;
};


export type QueryBookArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryBooksArgs = {
  filter?: Maybe<FilterInput>;
  sorts?: Maybe<Array<Maybe<SortInput>>>;
};


export type QueryStratecheryArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryStratecheriesArgs = {
  filter?: Maybe<FilterInput>;
  sorts?: Maybe<Array<Maybe<SortInput>>>;
};


export type QueryTechnicalArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryTechnicalsArgs = {
  filter?: Maybe<FilterInput>;
  sorts?: Maybe<Array<Maybe<SortInput>>>;
};


export type QueryKevins42HabitsToBoostYourProductivityArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryKevins42HabitsToBoostYourProductivitiesArgs = {
  filter?: Maybe<FilterInput>;
  sorts?: Maybe<Array<Maybe<SortInput>>>;
};


export type QueryEssayArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryEssaysArgs = {
  filter?: Maybe<FilterInput>;
  sorts?: Maybe<Array<Maybe<SortInput>>>;
};

export type RichText = {
  __typename?: 'RichText';
  plainText?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  annotations?: Maybe<Annotation>;
};

export type SelectFilterInput = {
  equals?: Maybe<Scalars['String']>;
  does_not_equal?: Maybe<Scalars['String']>;
  is_empty?: Maybe<Scalars['Boolean']>;
  is_not_empty?: Maybe<Scalars['Boolean']>;
};

export type SelectOption = {
  __typename?: 'SelectOption';
  name?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type SortInput = {
  property?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
  direction?: Maybe<Scalars['String']>;
};

export type TextFilterInput = {
  equals?: Maybe<Scalars['String']>;
  does_not_equal?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  does_not_contain?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
  ends_with?: Maybe<Scalars['String']>;
  is_empty?: Maybe<Scalars['Boolean']>;
  is_not_empty?: Maybe<Scalars['Boolean']>;
};

export type Books = {
  __typename?: 'books';
  id?: Maybe<Scalars['ID']>;
  published?: Maybe<Date>;
  lastUpdated?: Maybe<Scalars['String']>;
  completed?: Maybe<Date>;
  readingList?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  blocks?: Maybe<PaginatedListBlock>;
};

export type Essays = {
  __typename?: 'essays';
  id?: Maybe<Scalars['ID']>;
  excerpt?: Maybe<Scalars['String']>;
  published?: Maybe<Date>;
  status?: Maybe<SelectOption>;
  name?: Maybe<Scalars['String']>;
  blocks?: Maybe<PaginatedListBlock>;
};

export type Kevins42HabitsToBoostYourProductivity = {
  __typename?: 'kevins42HabitsToBoostYourProductivity';
  id?: Maybe<Scalars['ID']>;
  emoji?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<SelectOption>>>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  blocks?: Maybe<PaginatedListBlock>;
};

export type Page = {
  __typename?: 'page';
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  blocks?: Maybe<PaginatedListBlock>;
};

export type Posts = {
  __typename?: 'posts';
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  date?: Maybe<Date>;
  name?: Maybe<Scalars['String']>;
  blocks?: Maybe<PaginatedListBlock>;
};

export type Stratechery = {
  __typename?: 'stratechery';
  id?: Maybe<Scalars['ID']>;
  link?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  published?: Maybe<Date>;
  anki?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<SelectOption>>>;
  blocks?: Maybe<PaginatedListBlock>;
};

export type Technical = {
  __typename?: 'technical';
  id?: Maybe<Scalars['ID']>;
  created?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  published?: Maybe<Date>;
  blocks?: Maybe<PaginatedListBlock>;
};

export type PageFieldsFragment = (
  { __typename?: 'PaginatedListpage' }
  & { results?: Maybe<Array<Maybe<(
    { __typename?: 'page' }
    & { blocks?: Maybe<(
      { __typename?: 'PaginatedListBlock' }
      & { results?: Maybe<Array<Maybe<(
        { __typename?: 'Block' }
        & Pick<Block, 'markdown'>
      )>>> }
    )> }
  )>>> }
);

export type HomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageQuery = (
  { __typename?: 'Query' }
  & { pages?: Maybe<(
    { __typename?: 'PaginatedListpage' }
    & PageFieldsFragment
  )> }
);

export type AboutPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AboutPageQuery = (
  { __typename?: 'Query' }
  & { pages?: Maybe<(
    { __typename?: 'PaginatedListpage' }
    & PageFieldsFragment
  )> }
);

export type NewsletterPageQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsletterPageQuery = (
  { __typename?: 'Query' }
  & { pages?: Maybe<(
    { __typename?: 'PaginatedListpage' }
    & PageFieldsFragment
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<(
    { __typename?: 'PaginatedListposts' }
    & { results?: Maybe<Array<Maybe<(
      { __typename?: 'posts' }
      & Pick<Posts, 'slug' | 'name'>
      & { date?: Maybe<(
        { __typename?: 'Date' }
        & Pick<Date, 'start'>
      )> }
    )>>> }
  )> }
);

export type PostBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type PostBySlugQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<(
    { __typename?: 'PaginatedListposts' }
    & { results?: Maybe<Array<Maybe<(
      { __typename?: 'posts' }
      & Pick<Posts, 'name' | 'slug' | 'id'>
      & { date?: Maybe<(
        { __typename?: 'Date' }
        & Pick<Date, 'start'>
      )>, blocks?: Maybe<(
        { __typename?: 'PaginatedListBlock' }
        & { results?: Maybe<Array<Maybe<(
          { __typename?: 'Block' }
          & Pick<Block, 'markdown'>
        )>>> }
      )> }
    )>>> }
  )> }
);

export const PageFieldsFragmentDoc = gql`
    fragment PageFields on PaginatedListpage {
  results {
    blocks {
      results {
        markdown
      }
    }
  }
}
    `;
export const HomePageDocument = gql`
    query HomePage {
  pages(filter: {property: "slug", text: {equals: "/"}}) {
    ...PageFields
  }
}
    ${PageFieldsFragmentDoc}`;

/**
 * __useHomePageQuery__
 *
 * To run a query within a React component, call `useHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomePageQuery(baseOptions?: Apollo.QueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
      }
export function useHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, options);
        }
export type HomePageQueryHookResult = ReturnType<typeof useHomePageQuery>;
export type HomePageLazyQueryHookResult = ReturnType<typeof useHomePageLazyQuery>;
export type HomePageQueryResult = Apollo.QueryResult<HomePageQuery, HomePageQueryVariables>;
export const AboutPageDocument = gql`
    query AboutPage {
  pages(filter: {property: "slug", text: {equals: "about"}}) {
    ...PageFields
  }
}
    ${PageFieldsFragmentDoc}`;

/**
 * __useAboutPageQuery__
 *
 * To run a query within a React component, call `useAboutPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAboutPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAboutPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAboutPageQuery(baseOptions?: Apollo.QueryHookOptions<AboutPageQuery, AboutPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AboutPageQuery, AboutPageQueryVariables>(AboutPageDocument, options);
      }
export function useAboutPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AboutPageQuery, AboutPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AboutPageQuery, AboutPageQueryVariables>(AboutPageDocument, options);
        }
export type AboutPageQueryHookResult = ReturnType<typeof useAboutPageQuery>;
export type AboutPageLazyQueryHookResult = ReturnType<typeof useAboutPageLazyQuery>;
export type AboutPageQueryResult = Apollo.QueryResult<AboutPageQuery, AboutPageQueryVariables>;
export const NewsletterPageDocument = gql`
    query NewsletterPage {
  pages(filter: {property: "slug", text: {equals: "newsletter"}}) {
    ...PageFields
  }
}
    ${PageFieldsFragmentDoc}`;

/**
 * __useNewsletterPageQuery__
 *
 * To run a query within a React component, call `useNewsletterPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsletterPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsletterPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsletterPageQuery(baseOptions?: Apollo.QueryHookOptions<NewsletterPageQuery, NewsletterPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewsletterPageQuery, NewsletterPageQueryVariables>(NewsletterPageDocument, options);
      }
export function useNewsletterPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsletterPageQuery, NewsletterPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewsletterPageQuery, NewsletterPageQueryVariables>(NewsletterPageDocument, options);
        }
export type NewsletterPageQueryHookResult = ReturnType<typeof useNewsletterPageQuery>;
export type NewsletterPageLazyQueryHookResult = ReturnType<typeof useNewsletterPageLazyQuery>;
export type NewsletterPageQueryResult = Apollo.QueryResult<NewsletterPageQuery, NewsletterPageQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    results {
      date {
        start
      }
      slug
      name
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const PostBySlugDocument = gql`
    query PostBySlug($slug: String!) {
  posts(filter: {text: {equals: $slug}, property: "Slug"}) {
    results {
      name
      date {
        start
      }
      slug
      id
      blocks {
        results {
          markdown
        }
      }
    }
  }
}
    `;

/**
 * __usePostBySlugQuery__
 *
 * To run a query within a React component, call `usePostBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function usePostBySlugQuery(baseOptions: Apollo.QueryHookOptions<PostBySlugQuery, PostBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostBySlugQuery, PostBySlugQueryVariables>(PostBySlugDocument, options);
      }
export function usePostBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostBySlugQuery, PostBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostBySlugQuery, PostBySlugQueryVariables>(PostBySlugDocument, options);
        }
export type PostBySlugQueryHookResult = ReturnType<typeof usePostBySlugQuery>;
export type PostBySlugLazyQueryHookResult = ReturnType<typeof usePostBySlugLazyQuery>;
export type PostBySlugQueryResult = Apollo.QueryResult<PostBySlugQuery, PostBySlugQueryVariables>;