import Ember from 'ember';
import layout from '../templates/components/paper-data-table';

const {
	Component,
	computed
} = Ember;

export default Component.extend({
	layout,
	tagName: 'md-table-container',
	classNameBindings: ['noPadding:no-padding-table'],
	bodyComponent: 'paper-data-table-body',
	bodyRowComponent: 'paper-data-table-row',
	headComponent: 'paper-data-table-head',
  footComponent: 'paper-data-table-foot',
	rowWidth: 0,
	sortProp: '',
	sortDir: 'asc',
	selectable: false,

	sortDesc: computed('sortProp', 'sortDir', function() {
		let sortDesc = this.getProperties('sortProp', 'sortDir');
		return `${sortDesc.sortProp}:${sortDesc.sortDir}`;
	}).readOnly(),

	actions: {
		sortChanged(sortProp, sortDir) {
			if (this.get('onChangeSort')) {
				this.get('onChangeSort')({ sortProp, sortDir });
			} else {
				this.setProperties({ sortProp, sortDir });
			}
		}
	}
});
