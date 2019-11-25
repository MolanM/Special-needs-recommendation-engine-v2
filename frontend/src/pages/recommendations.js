import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';

const Recommendations = props => {
	const [recc, setRecc] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [waitEval, setWaitEval] = useState(false);
	const [clickedName, setClickedName] = useState();

	const getreq = () => {
		fetch(`${props.requestLink}/api/recommendations/${props.token}`)
			.then(res => res.json())
			.then(json => {
				if (json !== 'user error') {
					setRecc(json);
				}
				console.log(json);
				setIsLoading(false);
			});
	};
	const Items = props => {
		return (
			<div>
				<ul className="searched-items">
					{props.items.map(single => (
						<div key={single.name} className="maxer-540 mx-auto my-3">
							<div className="card">
								<div className="card-body">
									<a
										href={single.url}
										target="blank"
										onClick={() => clickedItems(single.name)}
									>
										<h4>{single.name}</h4>
									</a>
								</div>
							</div>
						</div>
					))}
				</ul>
			</div>
		);
	};
	const clickedItems = name => {
		setWaitEval(true);
		setClickedName(name);
	};

	const postEval = num => {
		setWaitEval(false);
		fetch(`${props.requestLink}/api/eval/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({
				name: props.token,
				material: clickedName,
				eng: num
			})
		})
			.then(res => res.json())
			.then(json => {
				console.log(json);
			});
	};

	const Eval = () => {
		return (
			<div className="position-fixed z-2000 full-width">
				<div className="alert alert-success" role="alert">
					<h4 className="alert-heading">Did you like {clickedName}</h4>
					<p>Please click something, pLS m7</p>
					<hr />
					<p className="mb-0">somethig something</p>
					<button
						className="btn btn-success m-3 px-5"
						onClick={() => postEval(1)}
					>
						Yes
					</button>
					<button
						className="btn btn-danger m-3 px-5"
						onClick={() => postEval(0)}
					>
						No
					</button>
				</div>
			</div>
		);
	};

	useEffect(() => {
		getreq();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Layout>
			{waitEval ? <Eval /> : null}
			{isLoading ? (
				<div className="loading-icon mx-auto" />
			) : recc ? (
				<Items items={recc} />
			) : (
				<div>
					<div className="text-center">It appears you are logged out</div>

					<Link to="/login">Login</Link>
				</div>
			)}
		</Layout>
	);
};

export default Recommendations;
