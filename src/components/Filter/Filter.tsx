import React, { useState } from "react";

interface Props {
	list: any[];
	setFilter: any;
}

function Filter({ list, setFilter }: Props) {
	return (
		<div>
			<select name='' id='' onChange={(e) => setFilter(e.target.value)}>
				{list &&
					list.map((item) => {
						return <option value={item}>{item}</option>;
					})}
			</select>
		</div>
	);
}

export default Filter;
