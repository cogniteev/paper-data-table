import Ember from 'ember';
import layout from '../templates/components/paper-data-table-foot';

const {
	Component
} = Ember;

export default Component.extend({
	classNames: ['md-foot'],
	attributeBindings: ['style'],
	layout,
	tagName: 'tfoot',
	cellspacing: '0',
	cellpadding: '0',
});
