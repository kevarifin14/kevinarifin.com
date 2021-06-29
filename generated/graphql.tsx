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
  technical?: Maybe<Technical>;
  technicals?: Maybe<PaginatedListtechnical>;
  page?: Maybe<Page>;
  pages?: Maybe<PaginatedListpage>;
  stratechery?: Maybe<Stratechery>;
  stratecheries?: Maybe<PaginatedListstratechery>;
  kevins42HabitsToBoostYourProductivity?: Maybe<Kevins42HabitsToBoostYourProductivity>;
  kevins42HabitsToBoostYourProductivities?: Maybe<PaginatedListkevins42HabitsToBoostYourProductivity>;
  essay?: Maybe<Essays>;
  essays?: Maybe<PaginatedListessays>;
};


export type QueryTechnicalArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryTechnicalsArgs = {
  filter?: Maybe<FilterInput>;
  sorts?: Maybe<Array<Maybe<SortInput>>>;
};


export type QueryPageArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPagesArgs = {
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

export type HomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageQuery = (
  { __typename?: 'Query' }
  & { pages?: Maybe<(
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
  )> }
);


export const HomePageDocument = gql`
    query HomePage {
  pages(filter: {property: "slug", text: {equals: "/"}}) {
    results {
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