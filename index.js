import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component{
  render(){
      return(
          <Register />
      );
  }
}
 

const validateForm=(errors) => {
  let valid=true;
  Object.values(errors).forEach(
      (val) => val.length > 0 && (valid=false)
  );
  return valid;
}

const countErrors=(errors) => {
  let count=0;
  Object.values(errors).forEach(
      (val) => val.length>0 && (count=count+1)
  );
  return count;
}

class Register extends Component{
  constructor(props){
      super(props);
      this.state={
          formValid:false,
          errorCount:null,
          errors:{
              fullName:'',
              password:'', 
          }
      };
  }

  handleChange = (event) => {
      event.preventDefault();
      const{name,value}=event.target;
      let errors=this.state.errors;

      switch(name){
          case 'fullName':
              errors.fullName=value.length<5 ? 'Full name must be 5 characters long!' : '';
              break;
          
          case 'password':
              errors.password=value.length<8 ? 'Password must be 8 characters long' : '';
              break;
          default:
              break;
}
   this.setState({errors,[name] : value});
          
  }

  handleSubmit=(event) => {
      event.preventDefault();
      this.setState({formValid:validateForm(this.state.errors)});
      this.setState({errorCount:countErrors(this.state.errors)});
  }
  render(){
      const{errors,formValid}=this.state;
      return(
          <div className='wrapper'>
          <div className='form-wrapper'>
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
          <div className='fullName'>
          <label htmlFor="fullName">Full Name</label>
          <input type='text' name='fullName' onChange={this.handleChange} noValidate/>
          {errors.fullName.length > 0 && 
          <span className='error'>{errors.fullName}</span>}
       </div>
       
       <div className='password'>
          <label htmlFor="password">Password</label>
          <input type='password' name='password' onChange={this.handleChange} noValidate/>
          {errors.password.length > 0 && 
          <span className='error'>{errors.password}</span>}
       </div>
       <div className='info'>
       <small>Password must be eight characters in length</small>
       </div>
       <div className='submit'>
       <button>Create</button>
       </div>
       {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid':'invalid'}</p>:'Form is not submitted'}
          </form>
          </div>
          </div>
      );
  }
}
ReactDOM.render(<App />,document.getElementById('root'));