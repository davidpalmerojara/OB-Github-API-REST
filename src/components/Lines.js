import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const Lines = ({ url }) => {
	const [ file, setFile ] = useState('');

	useEffect(
		() => {
			(async () => {
				const result = await fetch(url);
				const repos = await result.text();

				setFile(repos);
			})();
		},
		[ url ]
	);

	return (
		<Card>
			{file.length > 0 ? (
				<Card.Text>{(file.match(/\n/g) || '').length} Lines</Card.Text>
			) : (
				<h4>Couldn't get lines :(</h4>
			)}
		</Card>
	);
};

export default Lines;
