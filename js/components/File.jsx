import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { moveFile } from 'fileManagement';

const style = {
    float: 'left',
    width: '200px',
	border: '1px solid gray',
	padding: '0.5rem 1rem',
	margin: '.5rem',
	backgroundColor: 'white',
	cursor: 'move'
};

const imgStyle = {
    float: 'left',
    width: '185px'
};

class File extends React.Component {
    static propTypes = {
        file: PropTypes.object,
        isDragging: PropTypes.bool,
        connectDragSource: PropTypes.any,
        connectDropTarget: PropTypes.any
    }

    render() {
		const { file, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<div ref={node => this.node = node} style={{ ...style, opacity }}>
                <img style={{ ...imgStyle }} src={file.image} id={ file.id } />
                <br /> File name:{ file.text }
                <br /> ID:{ file.id }
			</div>
		));
	}
}

const fileSource = {
	beginDrag(props) {
		return {
			index: props.index,
			listId: props.listId,
			file: props.file
		};
	}
};

const fileTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;
        // By uncommenting this, along with adding `ref={node => this.node = node}` to line 35.
        // I get error `getDecoratedComponentInstance()` is not a function. This is needed for line 69
        // to be uncommented and 71 to be commented, so to remove the use of findDOMNode
        // const rawComponent = component.getDecoratedComponentInstance();

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		// const hoverBoundingRect = rawComponent.node.getBoundingClientRect();
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		if ( props.listId === sourceListId ) {
			moveFile(dragIndex, hoverIndex, props.file.category);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}
	}
};

export default flow(
	DropTarget("FILE", fileTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("FILE", fileSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(File);
