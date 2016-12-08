import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModelContainer from './components/modelContainer';
import CustomDataTypeList from './components/customDataTypeList';

const models = document.getElementById('models');
const dataTypes = document.getElementById('data-types');

if (models) {
	ReactDOM.render(<ModelContainer />, models);
}

if (dataTypes) {
	ReactDOM.render(<CustomDataTypeList />, dataTypes);
}
