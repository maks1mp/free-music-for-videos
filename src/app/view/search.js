import React, { Component } from 'react';


class Search extends Component {
    handleSearch(event){
        let { value } = event.target;
        this.props.search([].map.call( value.trim() , (item, index, arr) => arr.slice(0, index + 1) ));
    }
    render(){
        return (
            <section className="search-panel">
                    <input type="text" 
                           name="search" 
                           ref={ input => this.searchInput = input }
                           onChange={ this.handleSearch.bind(this) }
                    /> 
            </section>
        )
    }
}

export default Search;