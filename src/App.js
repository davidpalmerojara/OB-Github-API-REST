import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Nav, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import User from './components/User';

const App = () => {
	const [ user, setUser ] = useState('');
	const [ ready, setReady ] = useState(false);

	const getUser = (e) => {
		e.preventDefault();
		setReady(false);
		setUser(e.target.value);
	};

	const getReady = (e) => {
		if (user !== '') setReady(true);
	};

	const preventForm = (e) => {
		e.preventDefault();
	};
	return (
		<div className="App">
			{ready ? (
				<div>
					<Alert variant="success">
						<Alert.Heading>Thanks {user}!</Alert.Heading>
						<p>Use the search box again to change user or navigate with the buttons!</p>
					</Alert>
					<Nav
						py={5}
						className="justify-content-center"
						onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
					>
						<Nav.Item>
							<Form onSubmit={preventForm}>
								<Row className="align-items-center">
									<Col m={3} className="my-1">
										<Form.Label htmlFor="inlineFormInputInput" visuallyHidden>
											Name
										</Form.Label>
										<Form.Control
											value={user}
											onChange={getUser}
											type="text"
											placeholder="Enter user"
										/>
									</Col>
									<Col xs="auto" className="my-1">
										<Button onClick={getReady} onKeyPress={getReady}>
											Search
										</Button>
									</Col>
								</Row>
							</Form>
						</Nav.Item>
					</Nav>
					<br />
					<User user={user} />
				</div>
			) : (
				<Container fluid style={{ padding: '0' }}>
					<Alert variant="primary">
						<Alert.Heading>Welcome!</Alert.Heading>
						<p>
							Search your user in the input box and we will show all the repositories, commits and files
							in it
						</p>
					</Alert>
					<Nav
						className="justify-content-center"
						onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
					>
						<Nav.Item>
							<Form onSubmit={preventForm}>
								<Row className="align-items-center">
									<Col m={3} className="my-1">
										<Form.Label htmlFor="inlineFormInputInput" visuallyHidden>
											Name
										</Form.Label>
										<Form.Control
											value={user}
											onChange={getUser}
											type="text"
											placeholder="Enter user"
										/>
									</Col>
									<Col xs="auto" className="my-1">
										<Button onClick={getReady} onKeyPress={getReady}>
											Search
										</Button>
									</Col>
								</Row>
							</Form>
						</Nav.Item>
					</Nav>
				</Container>
			)}
		</div>
	);
};

export default App;
