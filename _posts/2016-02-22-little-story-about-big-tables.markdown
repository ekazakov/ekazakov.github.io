---
layout: post
title:  "Little Story About Big Tables"
date:   2016-02-22
categories: posts
---

Sunner or later at developing your super cool enterprise level SPA,
your will meet it — the big table. For the sake of clarity, under big tables
I mean tables from 1k to 100k records.

// Why rendering big tables matters? Because paginaation sucks. (? really)

Modern descktop browsers could easely operate with such amount of records, so it's
some times usefull to upload them all at once. You could quickly filter and sort them,
without loosing time on network delays.

If we have to show table we could show everything at once. But such solution is
severe flawed. Rendering of a big table takes a lot, what degradetes user expirience.

Here few examples of rendering full table at one go.

...



# Plan

* Intro
* Example with big, static table and React static table
* Render only visible table
* Requirements
* Step-by-step
* Examples
* About mobile
* React-canvas rendering

<!--more-->

<div>
<!-- <iframe class="" id="" src="http://jsbin.com/gusecep/2/edit?js,output" style="border: 1px solid rgb(170, 170, 170); width: 100%; min-height: 600px; height: 38px;"></iframe> -->
</div>


