import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import FileCard from './File'
import { moveFile, updateFile } from '../fileManagement';

class FilesChoice extends React.Component {
    static propTypes = {
        canDrop: PropTypes.bool,
        isOver: PropTypes.bool,
        connectDropTarget: PropTypes.any,
        id: PropTypes.number,
        list: PropTypes.array
    }

    constructor(props) {
		super(props);
	}

    render() {
		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;
		const style = {
			width: "100%",
			minHeight: "350px",
            height: "auto",
            overflow: "auto",
			border: '1px dashed gray'
		};

		const backgroundColor = isActive ? '#2514f7' : '#FFF';

		return connectDropTarget(
            <div>
                <div ref={node => this.node = node} style={{...style, backgroundColor}}>
                    {this.props.list.map((file, i) => {
                        return (
                            <FileCard
                                key={i}
                                index={i}
                                listId={this.props.id}
                                file={file}
                                moveFile={moveFile}
                                ref={node => this.node = node}
                            />
                        );
                    })}
                </div>
            </div>
		);
    }
}

const fileTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		const sourceObj = monitor.getItem();
        console.log(component.getDecoratedComponentInstance())
		if ( id !== sourceObj.listId ) {
            updateFile(
                sourceObj.file.id,
                {
                    'enabled': !sourceObj.file.enabled
                },
                sourceObj.file.category);
        }
		return {
			listId: id
		};
	}
}

export default DropTarget("FILE", fileTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(FilesChoice);
