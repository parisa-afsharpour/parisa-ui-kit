import React, { Component, useRef, useState, useEffect } from "react";
// import { Responsive, WidthProvider } from "react-grid-layout";
import "./Dashboard.css";
import Chart from "./Chart";
import DailyLineChart from "../../../sina/components/dailyLineChart/DailyLineChart";
// const ResponsiveGridLayout = WidthProvider(Responsive);

const App = () => {
    const conRef = useRef(null);


    const chartRefs = [];
    const setChartRef = (ref) => {
        chartRefs.push(ref);
    };

    const gridItems = [
        {id: 1, name: "Item One"},
        {id: 2, name: "Item Two"},
        {id: 3, name: "Item Three"},
        {id: 4, name: "Item Four"},
        {id: 5, name: "Item Five"},
        {id: 6, name: "Item Six"},
        // { id: 7, name: "Item Seven" },
        // { id: 8, name: "Item Eight" },
        // { id: 9, name: "Item Nine" }
    ];
    const layout = [
        {i: "1", x: 0, y: 0, w: 4, h: 4, minW: 2, minH: 1},
        {i: "2", x: 4, y: 0, w: 4, h: 4, minW: 2, minH: 1},
        {i: "3", x: 8, y: 0, w: 4, h: 4, minW: 2, minH: 1},
        {i: "4", x: 0, y: 5, w: 4, h: 4, minW: 2, minH: 1},
        {i: "5", x: 4, y: 5, w: 4, h: 4, minW: 2, minH: 1},
        {i: "6", x: 8, y: 5, w: 4, h: 4, minW: 2, minH: 1},
        // { i: "7", x: 0, y: 6, w: 5, h: 2, minW: 2, minH: 1 },
        // { i: "8", x: 5, y: 6, w: 3, h: 2, minW: 2, minH: 1 },
        // { i: "9", x: 8, y: 6, w: 3, h: 2, minW: 2, minH: 1 }
    ];

    const onDragging = () => {

    }

    const onMoveCard = () => {

    }

    return (
        <div style={{direction: 'ltr'}}>
        {/*<ResponsiveGridLayout*/}
        {/*    draggableHandle=".window-header"*/}
        {/*    layouts={{lg: layout}}*/}
        {/*    measureBeforeMount={true}*/}
        {/*    className="layout"*/}
        {/*    // rowHeight={this.props.rowHeight}*/}
        {/*    isDragable={true}*/}
        {/*    isResizable={true}*/}
        {/*    onDrag={onDragging}*/}
        {/*    onDragStop={onMoveCard}*/}
        {/*    margin={[30, 30]}*/}
        {/*    onResizeStop={function (e, layout) {*/}
        {/*        chartRefs[layout.i - 1].redraw();*/}
        {/*    }}*/}
        {/*    onLayoutChange={(layout) => {*/}
        {/*        console.log('onLayoutChange. new layout: ', JSON.stringify(layout))*/}
        {/*    }}*/}

        {/*>*/}
        {/*    {gridItems.map((item, i) => {*/}
        {/*        return (*/}
        {/*            <div key={item.id} ref={conRef} className="grid-item">*/}
        {/*                /!*<Chart title={item.name} ref={setChartRef} />*!/*/}
        {/*                <DailyLineChart/>*/}
        {/*            </div>*/}
        {/*        );*/}
        {/*    })}*/}
        {/*</ResponsiveGridLayout>*/}
        </div>
    );
}


export default App;
