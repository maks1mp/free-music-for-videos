import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startFetch, onSearchTrack, clearTracksList } from '../actions';
import { debounce } from '../libs';

class Search extends Component {
    constructor(props){
        super(props);
        this.getTracks = debounce(this.getTracks, 350, this);
    }
    onHandleSearch(event){
        let txt = event.target.value,
            { dispatch } = this.props;

        dispatch(onSearchTrack(txt));
        this.getTracks(txt);
    }
    getTracks(title){
        let { dispatch } = this.props;

        title.trim() ? dispatch(startFetch(title)) : dispatch(clearTracksList());
    }
    render(){
        let { searchValue } = this.props;
        return (
            <div>
                <form action="" onSubmit={()=>{console.log('submit')}}>
                    <input type="text" 
                           onChange={this.onHandleSearch.bind(this)}
                           value={searchValue}
                    />
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    searchValue: state.search
});

export default connect(mapStateToProps)(Search);
