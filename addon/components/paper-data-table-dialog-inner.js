import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import Ember from 'ember';
import layout from '../templates/components/paper-data-table-dialog-inner';

const {
    Handlebars: { Utils: { escapeExpression } }
} = Ember;

export default Component.extend({
	layout,
	tagName: 'md-edit-dialog',
	attributeBindings: ['style'],
	width: null,
	transitionClass: 'ng',
	classNames: ['md-whiteframe-1dp'],
	style: computed('left','top','width',function() {
		let left = escapeExpression(this.get('left'));
		let top = escapeExpression(this.get('top'));
		let width = escapeExpression(this.get('width'));
		return htmlSafe(`left: ${left}px;top: ${top}px; min-width: ${width}px;`);
	}),

	positionDialog() {
		let element = this.get('element') || { clientWidth: 0, clientHeight: 0};
		let size = { width: element.clientWidth, height: element.clientHeight };
		let cellBounds = document.querySelector(`#${this.get('parent')}`).getBoundingClientRect();
		let tableBounds = this._mdTableContainer.getBoundingClientRect();

		if (size.width > tableBounds.right - cellBounds.left) {
			this.set('left',tableBounds.right - size.width);
		} else {
			this.set('left',cellBounds.left);
		}

		if (size.height > tableBounds.bottom - cellBounds.top) {
			this.set('top',tableBounds.bottom - size.height);
		} else {
			this.set('top',cellBounds.top + 1);
		}
		this.set('width',(this.get('row') ? tableBounds.width : cellBounds.width));
	},

	didInsertElement() {
		this._super(...arguments);
		this._mdTableContainer = this.element.closest('md-table-container');
		this._positionDialog = this.positionDialog.bind(this);
		window.addEventListener('resize', this._positionDialog);
		run.scheduleOnce('afterRender', this, function() {
		  if (!this.isDestroying || !this.isDestroyed) {
        this.positionDialog();
        const input = this.element.querySelector('input');
        if (input) {
          input.focus();
        }
      }
		});
	},

	willDestroyElement() {
		this._super(...arguments);
    window.removeEventListener('resize', this._positionDialog);
	}
});
