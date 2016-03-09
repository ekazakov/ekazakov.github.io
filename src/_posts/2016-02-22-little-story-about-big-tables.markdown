---
layout: post
title:  "Big Tables and React"
date:   2016-02-22
categories: posts
---

Sunner or later at developing your super cool enterprise level SPA, your will meet it — the big table. For the sake of clarity, under big tables I mean tables from 1k to 100k records.

> Why rendering big tables matters? Because paginaation sucks. (? really)

Modern descktop browsers could easely operate with such amount of records, so it's some times usefull to upload them all at once. You could quickly filter and sort them, without loosing time on network delays.

If we have to show table we could show everything at once. But such solution is
severe flawed. Rendering of a big table takes a lot of time, what degradetes user expirience.

> Here few examples of rendering full table at one go.

...

Okay. We saw thar rendering all your data at once is not a good idea. So it is right time for optimisation!

The main idea is deadly simple. What if we will render only rows which are visible. In average there are around few dozens of rows fitted in the window. So it is possible to render only them. And when user scrolls up or down render new portion of rows and remove old ones.

Lets create component for optimizing long lists and tables rendering. For this task will be using React. Of course you could use any framework or none. But React nicely fits for such kind of tasks.

Basic requirements for ours component:

* Render only visible portion of records
* Render new portion of rows on scroll event
* Correctly handle rows of the different height
* Emulate content height for correct scroll displaying.
* Handle window resize event

**Body parts**

> Basic exmaple and preparations

```javascript
class TableRow extends React.Component {
    render() {
        const {row} = this.props;
        return <tr style={{height: 40}}>
            <td className="index"><div>{row.id}</div></td>
            <td className="name"><div>{row.name}</div></td>
            <td className="address"><div>{row.address}</div></td>
        </tr>;
    }
}
```

```javascript
class TableRowsSet extends React.Component {
    render() {
        const {rows, from, to} = this.props;
        return <table>
            <tbody>
                {rows.slice(from, to).map(row => <TableRow key={row.id} row={row}/>)}
            </tbody>
        </table>;
    }
}
```

```javascript
class App extends React.Component {
    render() {
        const {rows} = this.props;
        const options = {
            size: rows.length,
            rowHeight: 40
        };
        return <div>
            <div id="table">
                <Scrollable {...options} >
                    <TableRowsSet rows={rows}/>
                </Scrollable>
            </div>
        </div>;
    }
}
```

```javascript
class Scrollable extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            viewportHeight: window.innerHeight,
            scrollTop: window.pageYOffset
        };
    }

    render() {
        const from = 0;
        const to = this.state.viewportHeight / this.props.rowHeight;
        return <div>
            {React.Children.map(
                this.props.children,
                (child) => React.cloneElement(child, {from, to}, child.props.children))}
        </div>;
    }
}
```
<!--
**Nasty scroll**

> intro to events section

The sad truth is, that messing with the scroll in the browser is almost always painful. There are two ways to handle scroll. First is `scroll` event and the second one is `wheel`, `mousewheel` (and ancient `MozMousePixelScroll`, `DOMMouseScroll`) events.

Scroll event fired when you scroll content in window or in div element with `overflow: scroll | auto` when the content height longer than container. It could be triggered by any means (arrow keys, scrollbar, mouse wheel or touch pad). It has only one drawback — you cannot cancel it!

This leads to very unplesant case. When you have a window with scroll and some element with its own scroll. Then when you scroll element container down the scroll event will be fired on window and it begin scrolls too.

> example with scroll in scroll.

And you cannot do anythig with it.

Wheel event and all his non-standard relatives behaves differently. It fires when ever the user uses the mouse wheel or trackpad. The page does not have to scroll in order to fire this event. So you cold implement completly custom scroll if you want...

> * write more about scroll events

[See more about scroll events in...](https://github.com/facebook/fixed-data-table/blob/cf28c0e78a3859c9a6e5d94fc84912e28d64f62a/src/vendor_upstream/dom/normalizeWheel.js)
 -->

# Plan

* Intro
* Example with big, static table and React static table
* Render only visible table
* Requirements
* Step-by-step
    * Document scroll
    * Viewport and onScroll
    * Rows height: constant and variable
    * Resize
    * Lift the side effects up
    * Testing
* Examples
* About mobile
* React-canvas rendering

<!--more-->

<div>
<!-- <iframe class="" id="" src="http://jsbin.com/gusecep/2/edit?js,output" style="border: 1px solid rgb(170, 170, 170); width: 100%; min-height: 600px; height: 38px;"></iframe> -->
</div>


