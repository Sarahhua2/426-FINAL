# Web-Development Final Project: Task Management Website

Video demo: https://www.youtube.com/watch?v=rSFJ5k1UK8s

## Launching the app

Switch to the master branch. Navigate to the 'Run and Debug' tab on VSCode, choose the 'Node.js' option from the drop-down menu, and from 'Select Launch Configuration', choose 'Run Current File'. Then navigate to 'app.mjs' and click the green arrow to run the file and start the backend server. Then use the Live Server extension to run the frontend.

## Overview

For our final project, we developed a task management website. It features a comprehensive system that allows users to manage their tasks effectively. The platform supports all CRUD (Create, Read, Update, Delete) operations for task management. Additionally, it integrates a third-party API to fetch and display inspirational quotes, which users can also delete if desired.

## Features

Task Management: Users can create, view, modify, and delete tasks.
Inspirational Quotes: Fetch quotes from a third-party API to inspire users during their task management.
Interactive UI: A user-friendly interface that makes managing tasks and viewing quotes easy.

## Front-End 

Our front end is interactive and event-driven. Users can click on a button to create, modify, and delete their tasks 

## Backend 

Our backend serves two resources (tasks and quotes) with a RESTful CRUD API

## Third-Party API 

Our website integrates a quotes API (https://type.fit/api/quotes), that gives users a quote upon pressing the button.


## Session Persistence

A user's data is stored using session storage. Data persists throughout the pages in a single session.
