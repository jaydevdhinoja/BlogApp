import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost,deletePost} from '../actions';
import {Link} from 'react-router-dom';

export class PostsDetail extends Component{

    componentDidMount(){
        //destructring 
        if(!this.props.post){
            const {id} = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    onDeleteClick(){
        const {id} = this.props.match.params;
        this.props.deletePost(id,() =>{
            this.props.history.push("/");
        });
    }
    render(){
        const {post} = this.props;
        
        if(!post){
            return <div>Loading...</div>
        }

        return(
            <div>
                <Link to="/" className="btn btn-primary">Back to Index</Link>
                <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete this post</button> 
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}

//state.posts to {posts} destructuring 
function mapStateToProps({posts},ownProps){
    
    //console.log(ownProps.match.params.id);
    //console.log(posts);
    //debugger;
    return{post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchPost,deletePost})(PostsDetail); 