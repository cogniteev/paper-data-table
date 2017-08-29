import Component from '@ember/component';
import layout from '../templates/components/paper-data-table-foot';

export default Component.extend({
	classNames: ['md-foot'],
	attributeBindings: ['style'],
	layout,
	tagName: 'tfoot',
	cellspacing: '0',
	cellpadding: '0',
});
