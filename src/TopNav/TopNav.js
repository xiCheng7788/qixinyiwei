import React,{Component} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import './TopNav.scss'

class TopNav extends Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            islogin:false,
            username:''
        }
        this.handleGetHeaderSucc=this.handleGetHeaderSucc.bind(this);
        this.handlecancel=this.handlecancel.bind(this);
    }
    componentWillMount(){
        axios.get('/users/isLogin')
        .then((res)=>{
           this.setState({
               islogin:res.data.login,
               username:res.data.username
           })
        })
    }
    componentDidMount(){
        
        fetch('http://localhost:9000/header.php')
            .then((response)=>response.json())
            .then(this.handleGetHeaderSucc)
        
    }
    handleGetHeaderSucc(res){
        const {listnav}=res.data;
        this.setState({
            list:listnav
        })
        
    }
    handlecancel(){
        axios.get('/users/logout')
        .then((res)=>{
            this.setState({
                islogin:res.data.login
            })
        })
    }
	render(){
        const list=this.state.list.map((item,value)=>{
            return <li className="header-item" key={item.id}><Link to={item.url}  activeStyle={{color:'#108ee9'}} className="header-item-link">{item.title}</Link></li>            
        })
        const unlogin=(
            <div className="header-login">
                <span><Link to={'/login'}>登录&nbsp;|&nbsp;</Link></span>
                <span><Link to={'/login/register'}>注册</Link></span>
            </div>
        )
        const login=(
            <div className="header-login">
                <span><Link to={'/'}>用户：{this.state.username}|&nbsp;</Link></span>
                <span onClick={this.handlecancel}>注销</span>
            </div>
        )
		return (
            <div className="centerbox">
                <div className="header">
                    <div className="header-nav">
                        <Link to='/'>
                            <img alt="logo" className="header-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAeCAYAAABpP1GsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjODY4Y2Y1ZS04MzFhLWNiNGQtYTNlNC0wYzJlOGM5NGQyYWEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDY1MjgwMERCMTVEMTFFNkEwQTNDMDFDMDE3OERDQjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDY1MjgwMENCMTVEMTFFNkEwQTNDMDFDMDE3OERDQjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI3ZDUxOWRmLTY0MGQtNDU0ZC1iNjA3LTEwZjk0YjkwMTc0NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNjc4ZmU3Ni0yNTY3LTMwNGQtYTI1Ny1lMmRiODc3YWNhZWYiLz4gPC9y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"/>
                        </Link>
                        <div className="header-right">
                            {this.state.islogin?login:unlogin}
                            <ul className="header-list">
                                {list}
                            </ul>
                        </div>
                       
                    </div>
                </div>
                <div className="newbody">
                {this.props.children}
                </div>
            </div>
            
            
		)
	}
}
export default TopNav