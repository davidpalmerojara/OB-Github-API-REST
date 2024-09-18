import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';

const Repositories = ({ user, getReady, token }) => {
	const [ repositories, setRepositories ] = useState([]);

	useEffect(
		() => {
			(async () => {
				const result = await fetch(`https://api.github.com/users/${user}/repos`, {
					headers: { Authorization: token }
				});
				const repos = await result.json();

				setRepositories(repos);
			})();
		},
		[ user, token ]
	);

	return (
		<div>
			{repositories.length > 0 ? (
				<Card bg="primary" text="white">
					<Card.Header>
						<br />
						<h2>Repositories:</h2>
						<br />
					</Card.Header>
					{repositories.map((repository, index) => {
						return (
							<Card text="dark" key={index} className="repo">
								<Card.Header>
									<h5>{repository.name}</h5>
								</Card.Header>
								<Card.Body>
									<Button variant="light" className="repo-link" href={repository.html_url}>
										See on Github
									</Button>
									<Button
										className="repo-button"
										onClick={getReady(
											repository.commits_url.slice(0, -6),
											repository.name,
											repository.default_branch,
											false
										)}
									>
										See commits!
									</Button>
								</Card.Body>
							</Card>
						);
					})}
				</Card>
			) : (
				<p>Couldn't find any repository :(</p>
			)}
		</div>
	);
};

export default Repositories;
