import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import MovieTile from './MovieTile';
import Filter from './Filter';

const MovieInfoFragment = gql`
  fragment MovieInfo on Movie {
    id
    title
    isLiked
    score
    overview
    popularity
    poster
    cast {
      name
      id
      photo
    }
  }
`;

const GET_MOVIES = gql`
  query movieList($sort: SORT_TYPE, $page: Int!) {
    movies(sort: $sort, page: $page) {
      ...MovieInfo
    }
  }
  ${MovieInfoFragment}
`;

export const GET_LIKED_MOVIES = gql`
  {
    likes {
      ...MovieInfo
    }
  }
  ${MovieInfoFragment}
`;

export default class MovieList extends Component {
  state = { sort: 'POPULARITY' };

  onFilterChange = sort => this.setState({ sort });

  render = () => {
    return (
      <Query
        query={this.state.sort !== 'LIKES' ? GET_MOVIES : GET_LIKED_MOVIES}
        fetchPolicy={
          this.state.sort !== 'LIKES' ? 'cache-first' : 'cache-and-network'
        }
        variables={
          this.state.sort !== 'LIKES'
            ? {
                showLikes: false,
                page: 1,
                sort: this.state.sort,
              }
            : {}
        }
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) return 'Loading...';
          if (error) return `${error}`;

          return (
            <div>
              <Filter
                onFilterChange={this.onFilterChange}
                selected={this.state.sort}
              />
              {(data.movies || data.likes).map(movie => (
                <MovieTile key={movie.id} movie={movie} />
              ))}
              {data.movies && (
                <button
                  onClick={() => {
                    const newPage = Math.floor(data.movies.length / 20) + 1;
                    return fetchMore({
                      variables: {
                        page: newPage,
                      },
                      updateQuery: (previous, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return previous;
                        return {
                          movies: [
                            ...previous.movies,
                            ...fetchMoreResult.movies,
                          ],
                        };
                      },
                    });
                  }}
                >
                  Load More
                </button>
              )}
            </div>
          );
        }}
      </Query>
    );
  };
}
