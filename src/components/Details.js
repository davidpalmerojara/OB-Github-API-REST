import React, { useState, useEffect } from 'react';
import Files from './Files';
import { Button, Card } from 'react-bootstrap';

const Details = ({ url, user, repo, branch, token }) => {
	const [ content, setContent ] = useState('');
	const [ ready2, setReady2 ] = useState(true);

	useEffect(
		() => {
			(async () => {
				const result = await fetch(url, {
					headers: { Authorization: token }
				});
				const contents = await result.json();

				setContent(contents);
			})();
		},
		[ url, token ]
	);

	const getReady2 = () => (e) => {
		e.preventDefault();
		if (ready2) setReady2(false);
		else setReady2(true);
	};

	const getCount = () => {
		let lang = {};
		let ext;
		let files = content.tree;

		for (let i = 0; i < files.length; i++) {
			if (files[i].type !== 'tree') {
				if (files[i].path.lastIndexOf('.') !== -1) ext = files[i].path.substr(files[i].path.lastIndexOf('.'));
				else ext = files[i].path;
				if (ext.lastIndexOf('/') !== -1) ext = ext.substr(ext.lastIndexOf('/'));
				if (lang[ext] !== undefined) lang[ext] += 1;
				else lang[ext] = 1;
			}
		}
		return lang;
	};

	const showFilesCount = () => {
		return (
			<div>
				<Card>
					{Object.entries(getCount()).map(([ key, value ]) => {
						return (
							<Card.Text key={key}>
								{key} : {value}
							</Card.Text>
						);
					})}
				</Card>
			</div>
		);
	};

	const show = () => {
		if (ready2) {
			return showFilesCount();
		} else return <Files content={content} repo={repo} user={user} branch={branch} getReady2={getReady2} />;
	};
	return (
		<div>
			{typeof content === 'object' ? (
				<div>
					<Card bg="primary" text="white">
						<Card.Header>
							<br />
							<h2>Number of files: {repo}</h2>
							<br />
						</Card.Header>
						<Card.Body>
							<Button variant="light" onClick={getReady2()}>
								Show files
							</Button>
						</Card.Body>
					</Card>
					<div>{show()}</div>
				</div>
			) : (
				<p>El repositorio no tiene contenido</p>
			)}
		</div>
	);
};

export default Details;
