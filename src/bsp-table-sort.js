import $ from 'jquery';

export default class TableSort {
	constructor($el, options) {
		this.$el = $el;
		this.options = $.extend(true, {}, this.defaults, options);
		this.addIndexes();
		this.assignEvents();
		this.$el.data('table-sort', this);
	}
	addIndexes() {
		var self = this;
		this.$el.find('tr').each((key, tr) => {
			$(tr).find('td, th').each((tdKey, td) => {
				$(td).attr('data-' + self.options.dataAttrColIndex, tdKey);
			});
		});
	}
	assignEvents() {
		var self = this;

		this.$el.find('[data-'+ this.options.dataAttrSortType +']').each((key, sortLink) => {
			$(sortLink).on('click', (e) => {
				self.sortByColumn(e.target);
				e.preventDefault();
			});
		});
	}
	parseNumber(str) {
		return Number( str.replace(/[^0-9\.]+/g,"") );
	}
	/** @todo: break this up into smaller functions */
	sortByColumn(sortLink) {
		var $tbody = this.$el.find('tbody'); 
		var $sortLink = $(sortLink);
		var $sortLinks = this.$el.find('[data-'+this.options.dataAttrSortType+']');
		var asc = this.options.classAsc;
		var columnIndex = $sortLink.closest('th').data(this.options.dataAttrColIndex);
		var desc = this.options.classDesc;
		var self = this;
		var sortType = $sortLink.data(this.options.dataAttrSortType);
		var order = [];
		var rows = [];
		var direction = desc;
		if ($sortLink.hasClass(desc)) {
			direction = asc;
		}

		$tbody.find('tr').each((key, row) => {
			var $cell = $( $(row).find('td').get(columnIndex) );
			var rawValue = $cell.data(self.options.dataValueAttr);
			if (!rawValue) {
				rawValue = $cell.html();
			}
			rows.push({
				key: key,
				html: row,
				rawValue: rawValue
			});
		});

		/**
		 * If there are multiple cells with the same value, this prevents 
		 * them from rearranging for no reason
		 */
		rows.reverse();

		if (sortType == 'numeric') {
			rows.sort((a, b) => {
				if (direction == desc) {
					return self.parseNumber(a.rawValue) - self.parseNumber(b.rawValue);
				} else {
					return self.parseNumber(b.rawValue) - self.parseNumber(a.rawValue);
				}
			});
		} else if (sortType == 'date') {
			rows.sort((a, b) => {
				if (direction == desc) {
					return new Date(a.rawValue) - new Date(b.rawValue);
				} else {
					return new Date(b.rawValue) - new Date(a.rawValue);
				}
			});
		} else if (sortType == 'alpha') {
			rows.sort((a, b) => {
				if (direction == desc) {
					return a.rawValue > b.rawValue;
				} else {
					return b.rawValue > a.rawValue;
				}
			});
		} else {
			return;
		}

		$sortLinks.removeClass(asc + ' ' + desc);
		$sortLink.addClass(direction);

		$tbody.empty();
		rows.forEach((row) => {
			$tbody.prepend(row.html);
		});
	}
}

TableSort.prototype.defaults = {
	classAsc : 'asc',
	classDesc : 'desc',
	dataAttrColIndex : 'table-sort-column-index',
	dataAttrSortType : 'sort-by',
	dataValueAttr : 'value'
};