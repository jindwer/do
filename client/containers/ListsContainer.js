import React, { PropTypes, Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { compose } from 'redux';
import modalsNames from '../constants/modalsNames';
import Lists from '../components/Lists';
import { removeList, addCardId, removeCardId } from '../actions/listsActions';
import { showModal } from '../actions/modalActions';
import { moveCard } from '../actions/cardsActions';

function mapStateToProps(state, ownProps) {
  const { lists } = state.entities;
  const listsIds = ownProps.lists || [];

  return {
    lists: listsIds.map(id => lists[id]),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onListEditClick(listId) {
      dispatch(
        showModal(modalsNames.EDIT_LIST, { listId })
      );
    },

    onListRemoveClick(listId) {
      dispatch(removeList.request({
        boardId: ownProps.boardId,
        listId,
      }));
    },

    onListCardMove(source, target) {
      dispatch(removeCardId(source.listId, source.cardId));
      dispatch(addCardId(target.listId, source.cardId));
    },
  };
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Lists);
