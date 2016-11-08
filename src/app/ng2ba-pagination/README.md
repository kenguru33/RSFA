# ng2ba-pagination

## filter:

Put at the end of the pipe chain.

paginate: {id:'mycomp1', pageSize:12, currentPage: page}

id - bind it to a component with the same id.

pageSize - number of items per page

currentPage - turn to this page 


## component:

<app-ng2ba-pagination [id]="'mycomp1" [showRange]="true" (pageSelected)="onPageSelect($event)" ></app-ng2ba-pagination>

id - unique identifier for this component
showRange - label navigation button with the range
labels - array of labels
(pageSelected) - event fired when navigation button is clicked. use this to set the current page in pipe. (Can this be done automatically inside n2ba-pagination?)

TODO: enable size property.
