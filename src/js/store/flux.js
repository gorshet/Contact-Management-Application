const getState = ({ getStore, setStore }) => {
	return {
		store: {
			my_awesome_agenda: []
			//Your data structures, A.K.A Entities
		},
		actions: {
			editContact(contact, history) {
				console.log(contact);
				fetch("https://assets.breatheco.de/apis/fake/contact/" + contact.id, {
					method: "PUT",
					headers: { "Content-Type": "Application/json" },
					body: JSON.stringify({
						full_name: contact.full_name,
						email: contact.email,
						agenda_slug: "my_awesome_agenda",
						address: contact.address,
						phone: contact.phone
					})
				}).then(res => {
					fetch("https://assets.breatheco.de/apis/fake/contact/agenda/my_awesome_agenda")
						.then(resp => resp.json())
						.then(data => {
							//console.log(data);
							const store = getStore();
							setStore({ agenda: data });
							history.push("/contacts");
						})

						.catch(error => {
							//console.log(error);
						});
				});
			},

			addContact: (name, email, address, phone) => {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						email: email,
						agenda_slug: "my_awesome_agenda",
						address: address,
						phone: phone
					})
				});
			},

			removeContact(id) {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						console.log(resp.ok); // will be true if the response is successfull
						return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(data => {
						const store = getStore();
						//here is were your code should start after the fetch finishes
						console.log(data); //this will print on the console the exact object received from the server
						setStore({
							my_awesome_agenda: store.my_awesome_agenda.filter(item => item.id !== id)
						});
					})
					.catch(error => {
						//error handling
						console.log("ERROR ", error);
					});
			}
		}
	};
};

export default getState;
