import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title,description,imageUrl,newsUrl,author,date} =this.props;
    return (
      <div className='my-3'>
        <div  className="card" >
  <img src={!imageUrl ? "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg" :imageUrl}  className="card-img-top" alt="..."/>
  <div  className="card-body">
    <h5  className="card-title">{title}</h5>
    <p  className="card-text">{description}</p>
    <p className="card-text"><small>By {!author ? "unKnown" :author} on {new Date(date).toGMTString()} </small></p>
    <a rel='noreferrer' href={newsUrl} target='_blank'  className="btn btn-dark">Read More</a>
    {/* <a href="/newsdetail"  className="btn btn-primary">Read More</a> */}
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem