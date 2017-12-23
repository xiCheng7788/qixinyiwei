import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox , message} from 'antd';
import axios from 'axios'
import "./register.scss"
const FormItem = Form.Item;

class Register extends Component{
    // constructor(props){
	// 	super(props)
	// }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            axios.post('/users/signUp',{
                username:values.username,
                password:values.password,
                email:values.email
              })
              .then((res)=>{
                console.log();
                if(res.data.success){
                    message.success('注册成功',2,()=>{
                        this.props.router.push('/login');
                    });
                }else{
                    message.success('重名啦');
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
                <FormItem>
                    <p className="regis-p">注册aGlass账号</p>
                    <a className="regis-login">登录</a>
                </FormItem>
                <FormItem>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '用户名错误' }],
                })(
                    <Input  style={{height:'50px'}} prefix={<Icon type="user"  style={{color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入邮箱" />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '密码不能为空' }],
                })(
                    <Input style={{height:'50px'}} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                )}
                </FormItem>
                <FormItem>
               {getFieldDecorator('confirm', {
                   rules: [{ required: true, message: '确认密码' }],
               })(
                   <Input  style={{height:'50px'}} prefix={<Icon type="confirm"  style={{color: 'rgba(0,0,0,.25)' }} />} placeholder="请确认密码" />
               )}
               </FormItem>
               <FormItem>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: '邮箱错误' }],
                })(
                    <Input  style={{height:'50px'}} prefix={<Icon type="email"  style={{color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入邮箱" />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(
                    <Checkbox>同意XXXXXXXXXXX</Checkbox>
                )}
                <a className="login-form-forgot" href="">忘记密码</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    注册
                </Button>
                </FormItem>
            </Form>
        )
    }


}

const WrappedNormalRegisterForm = Form.create()(Register);

export default WrappedNormalRegisterForm


