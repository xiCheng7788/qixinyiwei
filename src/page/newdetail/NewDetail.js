import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import './NewDetail.scss'

class NewDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            llist:[]
        }
        this.handleGetNewDetail=this.handleGetNewDetail.bind(this)
    }

    componentDidMount(){
        this.handleGetNewDetail()
    }
    handleGetNewDetail(){
        const id=this.props.params.id;
		fetch(`/api?method=article&version=1.0.0&timestamp=1473826623&paramData=%7B%22articleId%22%3A${id}%7D&lang=zh`)
            .then((response)=>response.json())
            .then(res=>{
                console.log(res);
                this.props.handleGetNewDetailSucc(res)
            })
        .catch(err=>{
            console.log(err)
        })
	}
    handleonClick(id){
        fetch(`/api?method=article&version=1.0.0&timestamp=1473826623&paramData=%7B%22articleId%22%3A${id}%7D&lang=zh`)
            .then((response)=>response.json())
            .then(res=>{
                console.log(res);
                this.props.handleGetNewDetailSucc(res)
            })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div className="seveninvensun-body">
                <div className="seveninvensun-side">
                {

                    this.props.list.length?this.props.list.map((item,value)=>{
                        return <li className="li-side" key={item.id} onClick={this.handleonClick.bind(this,item.id)}><Link to={'/newdetail/'+item.id}>{item.title}</Link></li>
                    }):''
                }
                </div>
                <div className="seveninvensun-view" dangerouslySetInnerHTML={{__html:this.props.article.content}}></div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        article:state.detail.newdetail,
        list:state.list.newlist
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        handleGetNewDetailSucc:(res)=>{
            const {article}=res.data;
            dispatch({
                type:'gaindetail',
                payload:article
            })
         }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewDetail)