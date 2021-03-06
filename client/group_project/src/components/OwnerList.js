import React, { Component } from 'react';
import OwnerSingle from './OwnerSingle';
import AddHomeForm from './AddHomeForm';

class OwnerList extends Component {
    constructor(props){
    super(props);
  this.state={
    homes:[],
    inputAddressValue: "",
    inputZipcodeValue: "",
    inputCityValue: "",
    inputBedroomsValue: "",
    inputPriceValue: "",
    inputAboutValue: "",
    inputImgValue: "",
  }
  this.handleHomesSubmit=this.handleHomesSubmit.bind(this);
  this.handleAddressChange=this.handleAddressChange.bind(this);
  this.handleZipcodeChange=this.handleZipcodeChange.bind(this);
  this.handleCityChange=this.handleCityChange.bind(this);
  this.handleBedroomsChange=this.handleBedroomsChange.bind(this);
  this.handlePriceChange=this.handlePriceChange.bind(this);
  this.handleAboutChange=this.handleAboutChange.bind(this);
  this.handleImgChange=this.handleImgChange.bind(this);
  this.handleDeleteHome=this.handleDeleteHome.bind(this);
  }
  componentDidMount() {
    this.fetchAllHomes()
    console.log('fetching')
  }

  fetchAllHomes() {
    fetch('https://homelistings.herokuapp.com/api/homes')
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      // console.log(responseJson.data.homes[4])
      //debugger;
      this.setState((prevState) => {
        return {
          homes: responseJson.data.homes,

        }
      });
    });
  }

    handleAddressChange(event) {console.log('chaingiejreirj')
      this.setState({inputAddressValue: event.target.value})
    } 
    handleZipcodeChange(event) {
      this.setState({inputZipcodeValue: event.target.value})
    }
    handleCityChange(event) {
      this.setState({inputCityValue: event.target.value})
    }
    handleBedroomsChange(event) {
      this.setState({inputBedroomsValue: event.target.value})
    } 
    handlePriceChange(event) {
      this.setState({inputPriceValue: event.target.value})
    }  
    handleAboutChange(event) {
      this.setState({inputAboutValue: event.target.value})
    }
    handleImgChange(event) {
      this.setState({inputImgValue: event.target.value})
    }

    handleHomesSubmit(event) {
        event.preventDefault();
        console.log('clicked')
        console.log(event.target.address)
        
        fetch('https://homelistings.herokuapp.com/api/homes',{
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            address: event.target.address.value,
            zipcode: event.target.zipcode.value,
            city: event.target.city.value,
            bedrooms: event.target.bedrooms.value,
            price: event.target.price.value,
            about: event.target.about.value,
            img_url: event.target.img_url.value,
          }),
        })
    }

 handleDeleteHome(homeId) {
    fetch(`https://homelistings.herokuapp.com/api/homes${homeId}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.status === 200) {
        this.fetchAllHomes();
      }
    })
  }
    

  render() {
    return (
      <div>
        {/*<ul className="homeslist">{this.state.homes.map((elem) => {
          return (
            <div>
            <p>hello</p>
            </div>
            // <Home
            //   key={elem.id}
            //   homes={elem}
            // />
          )
        })}
        </ul>
        
      {/*<Searchedcomp newSearched={this.state.newSearched}/>*/}
      <AddHomeForm
          handleHomesSubmit={this.handleHomesSubmit}
          handleAddressChange={this.handleAddressChange}
          handleZipcodeChange={this.handleZipcodeChange}
          handleCityChange={this.handleCityChange}
          handleBedroomsChange={this.handleBedroomsChange}
          handlePriceChange={this.handlePriceChange}
          handleAboutChange={this.handleAboutChange}
          handleImgChange={this.handleImgChange}
         />
        <OwnerSingle singlehome={this.state.homes} />
        
      </div>
      );
  }
}
export default OwnerList;