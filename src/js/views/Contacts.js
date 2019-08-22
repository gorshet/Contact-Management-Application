import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "../component/ContactCard.js";
import Modal from "../component/Modal";
import { Context } from "../store/appContext";

export default class Contacts extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			idPendingDeletion: null
		};
	}

	render() {
		return (
			<div className="container">
				<div>
					<p className="text-right my-3">
						<Link className="btn btn-success" to="/add">
							Add new contact
						</Link>
					</p>
					<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
						<ul className="list-group pull-down" id="contact-list">
							<ContactCard
								onTrashCanClick={id => this.setState({ showModal: true, idPendingDeletion: id })}
							/>
						</ul>
					</div>
				</div>
				<Modal
					id={this.state.idPendingDeletion}
					show={this.state.showModal}
					onClose={() => this.setState({ showModal: false })}
				/>
			</div>
		);
	}
}
