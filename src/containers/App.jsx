import React, { Component } from 'react';
import CardList from '../components/CardList';
// import { robots } from './robots';
import SearchBox from '../components/SearchBox';
import './App.css'
import Scroll from '../components/Scroll';

class App extends Component{
    constructor(){
        super();
        this.state = {
            robots:[],
            searchInput:''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots:users}))
    }

    onSearchChange = (event) => {
        this.setState(
            {
                searchInput:event.target.value
            }
        )
    }

    render(){
        const { robots, searchInput } = this.state;
        const filterRoboList = robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
        })
        if(!robots.length){
            return <h1 className=" pa5 tc">Loading....</h1>
        }else{
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filterRoboList} />
                    </Scroll>
                </div>
            )
        }
        
    }
    
}

export default App;