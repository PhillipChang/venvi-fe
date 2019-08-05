import React, { Component } from "react";
import { TextInput, Row, Col, Button } from "react-materialize";
import axios from "axios";

// function SearchInput() {
class SearchInput extends Component {
	state = {
		make: "",
		model: "",
		year: ""
	}

	searchAction = () => {
		console.log("Submit")
		var makeVeri = false;
		var modelVeri = false;

		axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json")
			.then(response => {
				var allMakes = response.data.Results;
				var queryMake = this.state.make.toLowerCase();

				console.log(queryMake);

				
				allMakes.forEach(value => {
					if (value.MakeName.toLowerCase().indexOf(queryMake) > -1) {
						console.log("Make match!")
						makeVeri = true;
					}
				})

				axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${this.state.make}/vehicleType/car?format=json`)
					.then(response => {
						var carModels = response.data.Results;
						axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${this.state.make}/vehicleType/truck?format=json`)
							.then(resp => {
								var truckModels = resp.data.Results;
								var allModels = carModels.concat(truckModels);
								console.log(allModels);
								var queryModel = this.state.model.toLowerCase();
								console.log(queryModel);

								allModels.forEach(value => {
									if (value.Model_Name.toLowerCase().indexOf(queryModel) > -1) {
										console.log("Model match!")
										modelVeri = true;
									}
								})

								var year = "";
								if (Number.parseInt(this.state.year)) {
									year = Number.parseInt(this.state.year)
								}


								if (makeVeri && modelVeri) {
									console.log("All input OK.")
									console.log(`https://www.googleapis.com/customsearch/v1?q=${year} ${queryMake}+${queryModel}&cx=014855097092208085078%3A6cwyf6e5-oc&searchType=image&fileType=png&key=AIzaSyBEg43tCIEFbmsUD3hVAMZtNOFGcj7M0Cs`)
									axios.get(`https://www.googleapis.com/customsearch/v1?q=${year} ${queryMake}+${queryModel}&cx=014855097092208085078%3A6cwyf6e5-oc&searchType=image&fileType=png&key=AIzaSyBEg43tCIEFbmsUD3hVAMZtNOFGcj7M0Cs`)
										.then(response => {
											var images = response.data.items[0].link;
											console.log(images)
										})
								}
								else {
									console.log("Error.")
								}


							})
					})

			})
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	render() {
		return (
			<Row>
				<Col>
					<form onSubmit={e => {
						e.preventDefault();
						this.searchAction();
					}}>
						<Row style={{ marginBottom: '0px' }}>
							<Col className="input-field">
								<TextInput name="make" value={this.state.make} onChange={this.handleChange} type="text" label="Make" />
							</Col>
							<Col className="input-field">
								<TextInput name="model" value={this.state.model} onChange={this.handleChange} type="text" label="Model" />
							</Col>
							<Col className="input-field">
								<TextInput name="year" value={this.state.year} onChange={this.handleChange} type="text" label="Year" />
							</Col>
						</Row>
						<Row>
							<Button type="submit" className="#37474f blue-grey darken-3" waves="light" style={{ marginLeft: '22px' }}>Search</Button>
						</Row>
					</form>
				</Col>
			</Row>
		)
	}
}

export default SearchInput;