import { DragDropContext } from 'react-dnd';
import { store, createDropFunction, populateStore } from '../fileManagement';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DropZone from 'react-dropzone';
import FilesChoice from './FilesChoice'
import HTML5Backend from 'react-dnd-html5-backend';
import React from 'react';
import update from 'react/lib/update';

class FilesContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            photo: store.photo,
            epc: store.epc,
            identification: store.identification,
            floorplan: store.floorplan
        };
    }

    componentDidMount() {
        let self = this;

        store.bind('update', function() {
            self.setState({
                "photo": store.photo,
                "epc": store.epc,
                "identification": store.identification,
                "floorplan": store.floorplan
            })
        })
    }

    componentWillUnmount() {
        store.unbind('update');
    }

    render() {
        const style = {
            justifyContent: "space-around",
            paddingTop: "20px"
        }

        const dropZoneStyle = {
            width: "100%",
            height: "100%"
        };

        return (
            <div style={{...style}}>
                <Tabs
                  onSelect={this.handleSelect}
                  selectedIndex={0}
                >
                    <TabList>
                        <Tab>Property Files</Tab>
                    </TabList>
                    <TabPanel>
                        <h4>Active</h4>
                        <DropZone onDrop={createDropFunction('photo')} style={{dropZoneStyle}}>
                            <FilesChoice id={1} type="active" onDrop={createDropFunction('photo')} list={this.state.photo.filter(function(value) {
                                return value.enabled === true;
                            })} />
                        </DropZone>
                        <h4>Inactive</h4>
                        <FilesChoice id={2} type="inactive" onDrop={createDropFunction('photo')} list={this.state.photo.filter(function(value) {
                            return value.enabled === false;
                        })} />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(FilesContainer);
