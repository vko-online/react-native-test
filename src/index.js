import React, { useCallback, useReducer, useEffect } from 'react';
import {
  View, StyleSheet, FlatList, Text,
} from 'react-native';
import User from './components/User';
import Indicator from './components/Indicator';
import Header from './components/Header';

const s = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  list: {
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 40,
  },
  finishedText: {
    textAlign: 'center',
    padding: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 16,
  },
});

const PER_PAGE = 10;
const initialState = {
  // jsonplaceholder has 100 posts, will require to scroll alot to show NoMoreUsers
  // hence page 8
  page: 8,
  loading: false,
  users: [],
  finished: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'start': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'end': {
      if (!action.payload.length) {
        return {
          ...state,
          loading: false,
          finished: true,
        };
      }
      return {
        ...state,
        loading: false,
        users: state.users.concat(action.payload),
        page: state.page + 1,
      };
    }
    default: {
      return state;
    }
  }
};
export default function Screen() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadUsers = useCallback(() => {
    if (!state.loading) {
      setTimeout(async () => {
        const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_start=${state.page * PER_PAGE}&_limit=${(state.page + 1) * PER_PAGE}`);
        const json = await res.json();
        dispatch({ type: 'end', payload: json });
      }, 3000);
    }
  }, [dispatch, state]);

  const mount = useCallback(() => {
    dispatch({ type: 'start' });
    loadUsers();
  }, [loadUsers, dispatch]);

  useEffect(() => {
    mount();
  }, []);

  if (state.loading) {
    return (
      <View style={s.loading}>
        <Indicator />
      </View>
    );
  }

  return (
    <View style={s.root}>
      <Header title="Users" />
      <FlatList
        onEndReached={loadUsers}
        onEndReachedThreshold={0.1}
        style={s.list}
        contentContainerStyle={s.listContainer}
        data={state.users}
        ListFooterComponent={() => {
          if (state.finished) {
            return <Text style={s.finishedText}>No more users</Text>;
          }
          return <View />;
        }}
        ItemSeparatorComponent={() => <View style={s.divider} />}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item }) => <User item={item} />}
      />
    </View>
  );
}
