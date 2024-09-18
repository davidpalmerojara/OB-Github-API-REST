import React, { useState } from 'react';
import Commits from './Commits';
import Repositories from './Repositories';

const User = ({ user }) => {
	const [ ready, setReady ] = useState(true);
	const [ repo, setRepo ] = useState('');
	const [ branch, setBranch ] = useState('');
	const [ url, setUrl ] = useState('');
	/*
    *   Enter your Token
    */
	const [ token ] = useState('');

	const getReady = (commit_url, repo, branch, state) => (e) => {
		e.preventDefault();
		setReady(state);
		if (commit_url !== '') setUrl(commit_url);
		if (repo !== '') setRepo(repo);
		if (branch !== '') setBranch(branch);
	};

	const show = () => {
		if (ready)
			return (
				<div>
					<Repositories user={user} token={token} getReady={getReady} />
				</div>
			);
		else
			return (
				<div>
					<Commits user={user} repo={repo} url={url} branch={branch} token={token} getReady={getReady} />
				</div>
			);
	};

	return <div>{show()}</div>;
};

export default User;
