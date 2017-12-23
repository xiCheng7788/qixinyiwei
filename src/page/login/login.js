import React,{Component} from 'react'
import { Form, Icon, Input, Button,message} from 'antd';
import axios from 'axios'
import "./login.scss"

const FormItem = Form.Item;

class Login extends Component{
    // constructor(props){
	// 	super(props)
	// }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            axios.post('/users/signIn',{
                username:values.username,
                password:values.password
              })
              .then((res)=>{
                console.log(res);
                if(res.data.login){
                    message.success('登录成功',2,()=>{
                        this.props.router.push('/home');
                    });
                }else{
                    message.success('登录失败');
                }
               
              })
              .catch(function(err){
                console.log(err);
            });
        }
        });
        
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
             <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem
                >
               {/*  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input  style={{height:'50px'}} prefix={<Icon type="user"  style={{color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )} */}
                 {getFieldDecorator('username', {
                    rules: [{ required: true, message: '用户名不能为空' }],
                })(
                    <Input style={{height:'50px'}} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="username" placeholder="用户名" />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message:'密码不能为空' }],
                })(
                    <Input style={{height:'50px'}} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码" />
                )}
                </FormItem>
                <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                Or <a href="">马上注册</a>
                </FormItem>
            </Form>
        )
    }

}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm