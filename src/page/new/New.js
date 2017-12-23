import React,{Component} from 'react'
import { Pagination } from 'antd';
import NewList from '../components/NewList'
import {connect} from 'react-redux'

import './New.scss'

class New extends Component {
	constructor(props){
		super(props)
		this.state={
			newlist:[],
			current:1,
			total:10
		}
		this.handleGetNewList=this.handleGetNewList.bind(this)
	}

	componentDidMount(){
		this.handleGetNewList()
	}
	handleGetNewList(page){
		fetch(`/api?method=pageArticleByFolder&version=1.0.0&timestamp=1473826623&pageSize=10&paramData=%7B"folderId"%3A2%7D&lang=zh&pageNo=${page?page:1}`)
		.then((response)=>response.json())
		.then(res=>{
			this.setState({
				total:res.data.total
			})
			this.props.handleGetNewSucc(res)
		})
	}
	onChange = (page) => {
		this.setState({
		  current: page
		});
		this.handleGetNewList(page)
	}

	render(){
		return(
			<div>
				<ul className="list-body">
					{
						this.props.newlist.length?this.props.newlist.map((item,value)=>{
						  return <li className="new-li" key={item.id}><NewList text={item}></NewList></li>
						}):''
					}
				</ul>
				<div>
					<div className="paging">
						<Pagination showQuickJumper current={this.state.current} total={this.state.total} onChange={this.onChange} />
					</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps=(state)=>{
	return {
		newlist:state.list.newlist
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		handleGetNewSucc:(res)=>{
			const {list}=res.data;
			dispatch({
				type:'setnews',
				payload:list
			})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(New)