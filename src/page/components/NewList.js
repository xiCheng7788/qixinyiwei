import React,{Component} from 'react'
import {Link} from 'react-router'
import './NewList.scss'

class NewList extends Component {
	
	constructor(props){
		super(props)
		this.state={
		}
	}
	render(){
		const text=this.props.text
		return(
		<div className="newsbox">
		    <div className="news-item">
			<div className="new-time">
			</div>
			<div className="news-text">
				<span><Link to={'/newdetail/'+text.id}>{text.title}</Link></span>
				<p>{text.abstract}</p>
			</div>
		    </div>
            </div>
		)
	}
}
export default NewList