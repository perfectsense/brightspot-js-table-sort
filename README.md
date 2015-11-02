# bsp-table

Makes tables sortable alphabetically, numerically or by date.

## Installation

`bower install perfectsense/brightspot-js-table-sort`

## Files

*	[bsp-table-sort](src/bsp-table-sort.js) is an [ES6](https://github.com/lukehoban/es6features) class that takes a table element and an options object literal as a constructor
*	[bsp-table-sort-plugin](src/bsp-table-sort-plugin.js) is [a Brightspot plugin](https://github.com/perfectsense/brightspot-js-utils) that makes use of bsp-table-sort

## Usage

In a project using [Brightspot Base](https://github.com/perfectsense/brightspot-base), import the plugin into [main.js](https://github.com/perfectsense/brightspot-base/blob/master/src/main/webapp/assets/scripts/main.js). This is done for you if the default Brightspot Base configuration is used.

Then create a table with a structure that looks like:

		<table data-bsp-table-sort>
			<thead>
				<tr>
					<th><a href="" data-sort-by="alpha">Alpha Sort</th>
					<th><a href="" data-sort-by="numeric">Numeric Sort</th>
					<th><a href="" data-sort-by="date">Date Sort</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td data-value>Ant</td>
					<td data-value>1</td>
					<td data-value>January 1, 2015</td>
				</tr>
				<tr>
					<td data-value>Bear</td>
					<td data-value>2</td>
					<td data-value>January 2, 2015</td>
				</tr>
				<tr>
					<td data-value>Cat</td>
					<td data-value>3</td>
					<td data-value>January 3, 2015</td>
				</tr>
			</tbody>
		</table>

You can also display different text than what you're sorting by:

	<tr>
		<td data-value="1">$</td>
	</tr>
	<tr>
		<td data-value="2">$$</td>
	</tr>
	<tr>
		<td data-value="3">$$$</td>
	</tr>
