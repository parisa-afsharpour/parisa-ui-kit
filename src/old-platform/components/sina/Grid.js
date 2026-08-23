 // import React from "react";
// import _ from "lodash";
// import RGL, { WidthProvider } from "react-grid-layout";
//
// const ReactGridLayout = WidthProvider(RGL);
//
// export default class BasicLayout extends React.PureComponent {
//     static defaultProps = {
//         className: "layout",
//         items: 20,
//         rowHeight: 30,
//         onLayoutChange: function() {},
//         cols: 12
//     };
//
//     constructor(props) {
//         super(props);
//
//         const layout = this.generateLayout();
//         this.state = { layout };
//     }
//
//     generateDOM() {
//         return _.map(_.range(this.props.items), function(i) {
//             return (
//                 <div key={i}>
//                     <span className="text">{i}</span>
//                 </div>
//             );
//         });
//     }
//
//     generateLayout() {
//         const p = this.props;
//         return _.map(new Array(p.items), function(item, i) {
//             const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
//             return {
//                 x: (i * 2) % 12,
//                 y: Math.floor(i / 6) * y,
//                 w: 2,
//                 h: y,
//                 i: i.toString()
//             };
//         });
//     }
//
//     onLayoutChange(layout) {
//         this.props.onLayoutChange(layout);
//     }
//
//     render() {
//         return (
//             <ReactGridLayout
//                 layout={this.state.layout}
//                 onLayoutChange={this.onLayoutChange}
//                 {...this.props}
//             >
//                 {this.generateDOM()}
//             </ReactGridLayout>
//         );
//     }
// }


// import React from "react";
// import { WidthProvider, Responsive } from "react-grid-layout";
//
// const ResponsiveReactGridLayout = WidthProvider(Responsive);
//
// /**
//  * This example illustrates how to let grid items lay themselves out with a bootstrap-style specification.
//  */
// export default class BootstrapStyleLayout extends React.PureComponent {
//     static defaultProps = {
//         isDraggable: true,
//         isResizable: true,
//         items: 20,
//         rowHeight: 30,
//         onLayoutChange: function() {},
//         cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
//     };
//
//     onLayoutChange(layout) {
//         this.props.onLayoutChange(layout);
//     }
//
//     render() {
//         return (
//             <ResponsiveReactGridLayout
//                 onLayoutChange={this.onLayoutChange}
//                 {...this.props}
//             >
//                 <div
//                     data-grid={{
//                         w: { lg: 6, md: 5, sm: 3, xs: 4, xxs: 2 },
//                         h: { lg: 4, xxs: 3 }
//                     }}
//                 >
//                     0
//                 </div>
//             </ResponsiveReactGridLayout>
//         );
//     }
// }

 import React from "react";
import GridLayout from 'react-grid-layout';

export default class MyFirstGrid extends React.Component {
    render() {
        // layout is an array of objects, see the demo for more complete usage
        const layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: false},
            {i: 'b', x: 100, y: 100, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 200, y: 200, w: 1, h: 2}
        ];
        return (
            <GridLayout className="layout"
                        layout={layout}
                        cols={12}
                        rowHeight={30}
                        width={1200}>

                <div key="a">a</div>
                <div key="b">b</div>
                <div key="c">c</div>
            </GridLayout>
        )
    }
}