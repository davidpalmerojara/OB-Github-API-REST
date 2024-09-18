import React, { useState, useEffect } from 'react';
import Details from './Details';
import { Button, Card } from 'react-bootstrap';

const Commits = ({ url, user, repo, branch, getReady, token }) => {
	const [ commits, setCommits ] = useState('');

	useEffect(
		() => {
			(async () => {
				const result = await fetch(url, {
					headers: { Authorization: token }
				});
				const repos = await result.json();

				setCommits(repos);
			})();
		},
		[ url, token ]
	);

	const showCommits = () => {
		return (
			<div>
				<Card>
					<Card.Body>
						{commits.map((commit, index) => {
							return <Card.Text key={index}>{commit.commit.message}</Card.Text>;
						})}
					</Card.Body>
				</Card>
			</div>
		);
	};
	return (
		<div>
			{commits.length > 0 ? (
				<div>
					<div>
						<Card bg="primary" text="white">
							<Card.Header>
								<br />
								<h2>Commits in {repo}</h2>
								<br />
							</Card.Header>
						</Card>
					</div>
					<div>{showCommits()}</div>
					<div>
						<Details
							user={user}
							repo={repo}
							branch={branch}
							token={token}
							url={commits[0].url.replace('commits', 'git/trees') + '?recursive=1'}
						/>
					</div>
				</div>
			) : (
				<p>Couldn't find any commit :(</p>
			)}
			<br />
			<Button onClick={getReady('', '', '', true)}>Go Back</Button>
			<p />
		</div>
	);
};

export default Commits;
