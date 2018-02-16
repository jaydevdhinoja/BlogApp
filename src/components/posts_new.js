import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{
    renderField(field)
    {
        //es6 destrcutring
        //field.meta.touched
        //field.meta.error
        const {meta:{touched,error}} = field

        const divClassName = `form-group ${touched && error ?  'has-danger':'' }`
        return(
            <div className={divClassName}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input}/>
                <div className="text-help">
                    {touched? error : ""}
                </div>
            </div>
        )
    }
    onSubmit(values){
        this.props.createPost(values,() =>{
            this.props.history.push("/");
        });
    }
    render(){
        const {handleSubmit} = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component= {this.renderField}/>
                <Field
                    label="Categories"
                    name="categories"
                    component= {this.renderField}/>
                <Field
                    label="Post Content"
                    name="content"
                    component= {this.renderField}/>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}
function validate(values){
    const errors = {};

    if(!values.title || values.title.Length < 3){
        errors.title = "Enter a Title";
    }

    if(!values.categories){
        errors.categories = "Enter a category";
    }

    if(!values.content){
        errors.content = "Enter some content please";
    }

    return errors;
}

export default reduxForm({
    validate,
    form:"AddNewPost"
}) (
connect(null,{createPost})
(PostsNew)
);