import React from 'react';
import { Card } from 'react-bootstrap';
import Lines from './Lines';

const Files = ({ content, repo, user, branch }) => {
	const showFiles = () => {
		return (
			<div>
				{content.tree.map((file, index) => {
					const color = file.type === 'tree' ? 'info' : 'light';
					const textColor = file.type === 'tree' ? 'white' : 'dark';
					return (
						<Card key={index} bg={color} text={textColor}>
							<Card.Header>{file.path}</Card.Header>
							<div>{showLines(file)}</div>
						</Card>
					);
				})}
			</div>
		);
	};

	const showLines = (file) => {
		if (file.type === 'blob') return <Lines url={getUrl(file)} repo={repo} />;
	};

	const getUrl = (file) => {
		let url1 = 'https://raw.githubusercontent.com/' + user + '/' + repo + '/' + branch + '/' + file.path;
		return url1;
	};

	return <div>{showFiles()}</div>;
};

export default Files;
