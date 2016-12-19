import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import ModelContainer from './components/ModelContainer';
import ModelList from './components/ModelList';
import NewModel from './components/NewModel';
import EditModel from './components/EditModel';
import CustomDataTypeList from './components/CustomDataTypeList';

const models = document.getElementById('models');
const dataTypes = document.getElementById('data-types');

if (models) {
	ReactDOM.render((
		<Router history={browserHistory}>
			<Route component={ModelContainer}>
				<Route path="/generator/models" component={ModelList}>
					<Route path="/generator/models/new" component={NewModel} />
					<Route path="/generator/models/:model_id/edit" component={EditModel} />
				</Route>
			</Route>
		</Router>
	), models);
}

if (dataTypes) {
	ReactDOM.render(<CustomDataTypeList />, dataTypes);
}
