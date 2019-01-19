
import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_LIKED_MOVIES } from './MovieList';
import Heart from './HeartIcon';

const TOGGLE_MOVIE_LIKE = gql`
  mutation toggleMovieLike($id: ID!) {
    toggleLike(id: $id) {
      id
      isLiked
    }
  }
`;

export default ({
  movie: { title, poster, overview, popularity, score, isLiked, id },
  user,
}) => (
  <Mutation
    mutation={TOGGLE_MOVIE_LIKE}
    update={(cache, { data: { toggleLike } }) => {
      const { likes } = cache.readQuery({ query: GET_LIKED_MOVIES });
      cache.writeQuery({
        query: GET_LIKED_MOVIES,
        data: { likes: likes.filter(like => like.id !== toggleLike.id) },
      });
    }}
  >
    {toggleMovieLike => (
      <div style={styles.container}>
        {poster ? (
          <img src={poster} style={styles.image} alt={title} />
        ) : (
          <p style={styles.image}>🎬 Poster coming soon</p>
        )}
        <div style={styles.content}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.overview}>{overview}</p>
          <p>
            {score > 0
              ? `Rating: ${score}/10 ${score > 5 ? '👏' : '👎'}`
              : 'Not rated yet!'}
          </p>
          <Heart
            active={isLiked}
            onClick={() =>
              toggleMovieLike({
                variables: { id },
                optimisticResponse: {
                  toggleLike: {
                    __typename: 'Movie',
                    id,
                    isLiked: !isLiked,
                  },
                },
              })
            }
          />
        </div>
      </div>
    )}
  </Mutation>
);

const styles = {
  container: {
    minHeight: 160,
    padding: 10,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    border: '1px solid #f1f1f1',
    boxShadow: "5px 5px 10px #f1f1f1",
    marginBottom: 26,
    borderRadius: 4,
  },
  image: {
    height: "auto",
    maxWidth: 200,
  },
  title: {
    display: 'inline',
  },
  content: {
    marginLeft: 30,
    flex: 1,
  },
  overview: {
    marginTop: 8,
  },
};
